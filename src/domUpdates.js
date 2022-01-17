import dayjs from 'dayjs';

const scrollSection = document.querySelector('#scrollSection');
const customerCost = document.querySelector('#customerCost');
const customerGreeting = document.querySelector('#customerGreeting');

const changeInnerText = (element, text) => {
  element.innerText = text;
}

const domUpdates = {
  generateCustomerDashboard(customer) {
    scrollSection.innerHTML = '';
    customer.bookings.forEach(booking => {
      scrollSection.innerHTML +=
      `<button class="panel booked-rooms">
        <img class="booking-image" src="./images/booking-image.png" alt="Snow covered Overlook Hotel">
        <section class="panel-right-side">
          <p class="panel-title">${booking.roomType}</p>
          <section class="booking-info">
            <p>Room: ${booking.roomNumber}</p>
            <p>${dayjs(booking.date).format('MMM DD, YYYY')}</p>
          </section>
        </section>
      </button>`
    });
    changeInnerText(customerGreeting, `Hello ${customer.name.split(' ')[0]}!`);
    changeInnerText(customerCost, `$${customer.totalCost}`);
  },
};

export {domUpdates};
