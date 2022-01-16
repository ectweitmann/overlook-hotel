
const getCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers');
}

const getSingleCustomer = (customerID) => {
  return fetch(`http://localhost:3001/api/v1/customers/${customerID}`);
}

const getRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms');
}

const getBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings');
}

const addNewBooking = (newBooking) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(newBooking),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

const deleteBooking = (bookingID) => {
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

module.exports = {
  getCustomers,
  getSingleCustomer,
  getRooms,
  getBookings,
  addNewBooking,
  deleteBooking
}
