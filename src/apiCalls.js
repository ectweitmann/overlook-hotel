
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

module.exports = {
  getCustomers,
  getSingleCustomer,
  getRooms,
  getBookings
}
