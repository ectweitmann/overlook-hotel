import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import customers from '../src/testing-data/customer-test-data';

describe('Customer', () => {
  let customer;

  beforeEach(() => {
    customer = new Customer(customers[0]);
  })

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

});
