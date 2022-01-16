
const getCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers');
}

const getSingleCustomer = (customerID) => {
  return fetch(`http://localhost:3001/api/v1/customers/${customerID}`);
}


module.exports = {
  getCustomers,
  getSingleCustomer
}
