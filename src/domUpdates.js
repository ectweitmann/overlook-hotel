import dayjs from 'dayjs';

const scrollSection = document.querySelector('#scrollSection');
const customerCost = document.querySelector('#customerCost');
const promptDashboard = document.querySelector('#promptDashboard');
const promptSelect = document.querySelector('#promptSelect');
const promptConfirm = document.querySelector('#promptConfirm');
const customerGreeting = document.querySelector('#customerGreeting');
const listTitle = document.querySelector('#listTitle');
const panelTitle = document.querySelector('#panelTitle');

const navDashboard = document.querySelector('#navDashboard');
const navBooking = document.querySelector('#navBooking');
const calendar = document.querySelector('#calendar');

const bookingInputFields = document.querySelector('#bookingInputFields');
const dashboardCost = document.querySelector('#dashboardCost');
const buttonDashboard = document.querySelector('#buttonDashboard');

const toggleClass = (elements, rule) => {
  elements.forEach(element => element.classList.toggle(rule));
}

const toggleAttribute = (element, value, state) => {
  element.setAttribute(value, state);
}

const changeInnerText = (element, text) => {
  element.innerText = text;
}

const domUpdates = {
  displayDashboard(customer) {
    domUpdates.changePageDisplay();
    domUpdates.generateCustomerDashboard(customer);
    toggleAttribute(scrollSection, 'aria-live', null);
    toggleAttribute(navBooking, 'aria-disabled', false);
    toggleAttribute(navDashboard, 'aria-disabled', true);
  },
  displayBookingsPage(hotel) {
    domUpdates.changePageDisplay();
    domUpdates.generateAvailableRooms(hotel);
    toggleAttribute(scrollSection, 'aria-live', 'polite');
    toggleAttribute(navBooking, 'aria-disabled', true);
    toggleAttribute(navDashboard, 'aria-disabled', false);
  },
  generateCustomerDashboard(customer) {
    scrollSection.innerHTML = '';
    customer.bookings.forEach(booking => {
      scrollSection.innerHTML +=
        `<button class="panel booked-rooms" role="listitem">
          <img class="booking-image" src="./images/booking-image.png" alt="Snow covered Overlook Hotel">
          <section class="panel-right-side">
            <p class="panel-title">${booking.roomType}</p>
            <section class="booking-info">
              <p>Room: ${booking.roomNumber}</p>
              <p>${dayjs(booking.date).format('MMM DD, YYYY')}</p>
            </section>
          </section>
        </button>`;
    });
    changeInnerText(customerGreeting, `Hello ${customer.name.split(' ')[0]}!`);
    changeInnerText(customerCost, `$${customer.totalCost}`);
  },
  generateAvailableRooms(hotel) {
    scrollSection.innerHTML = '';
    hotel.availableRooms.forEach(room => {
      scrollSection.innerHTML +=
        `<button class="panel available-room" role="listitem">
          <img class="booking-image" src="./images/booking-image.png" alt="Snow covered Overlook Hotel">
          <section class="panel-right-side">
            <p class="panel-title">${room.roomType}</p>
            <section class="panel-right-bottom">
              <section class="room-amenities">
                <p>Room: ${room.number}</p>
                <p>Amenities:</p>
                <ul>
                  <li>Has Bidet: ${room.bidet}</li>
                  <li>${room.numBeds} ${room.bedSize} bed(s)</li>
                </ul>
              </section>
              <section>
                <p class="price">$${room.costPerNight}</p>
                <p class="price-label">per night</p>
              </section>
            </section>
          </section>
        </button>`;
    });
  },
  changePageDisplay() {
    toggleClass([
      bookingInputFields,
      dashboardCost,
      buttonDashboard,
      promptSelect,
      customerGreeting,
      promptDashboard
    ], 'hidden');
    toggleClass([navDashboard, navBooking], 'current-view');
    if (navBooking.classList.contains('current-view')) {
      changeInnerText(listTitle, 'Available Rooms');
      changeInnerText(panelTitle, 'Search Rooms');
    } else {
      changeInnerText(listTitle, 'Your Bookings');
      changeInnerText(panelTitle, 'Price Summary');
    }
  },

};

export {domUpdates};
