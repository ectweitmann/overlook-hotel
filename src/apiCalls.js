
const getCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers');
}

const getSingleCustomer = (customerID) => {
  return fetch(`http://localhost:3001/api/v1/customers/${customerID}`);
}

const getRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms');
}

module.exports = {
  getCustomers,
  getSingleCustomer,
  getRooms
}
