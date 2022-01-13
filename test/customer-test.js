import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import customerTestData from '../src/testing-data/customer-test-data';

describe('Customer', () => {
  let customer;

  beforeEach(() => {
    customer = new Customer(customerTestData.customers[0]);
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instantiation of Customer', () => {
    expect(customer).to.be.an.instanceof(Customer);
  });

  it('should have an id', () => {
    expect(customer.id).to.be.a('Number');
    expect(customer.id).to.be.deep.equal(1);
  })

});
