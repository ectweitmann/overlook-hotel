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
      `<section class="panel">
        <img class="booking-image" src="./images/booking-image.png" alt="Snow covered Overlook Hotel">
        <section class="panel-right-side">
          <p class="panel-title">${booking.roomType}</p>
          <section class="booking-info">
            <p>Room: ${booking.roomNumber}</p>
            <p>${booking.date}</p>
          </section>
        </section>
      </section>`
    });
    changeInnerText(customerGreeting, `Hello ${customer.name.split(' ')[0]}!`);
    changeInnerText(customerCost, `$${customer.totalCost}`);
  },
};

export {domUpdates};
