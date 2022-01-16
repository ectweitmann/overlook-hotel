
const getCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers');
}


module.exports = {
  getCustomers
}
