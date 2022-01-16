
const apiCall = {
  getCustomers() {
    return fetch('http://localhost:3001/api/v1/customers');
  },
  getSingleCustomer(customerID) {
    return fetch(`http://localhost:3001/api/v1/customers/${customerID}`);
  },
  getRooms() {
    return fetch('http://localhost:3001/api/v1/rooms');
  },
  getBookings() {
    return fetch('http://localhost:3001/api/v1/bookings');
  },
  addNewBooking(newBooking) {
    return fetch('http://localhost:3001/api/v1/bookings', {
      method: 'POST',
      body: JSON.stringify(newBooking),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  deleteBooking(bookingID) {
    return fetch(`http://localhost:3001/api/v1/bookings/${bookingID}`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: bookingID
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

module.exports = {apiCall};
