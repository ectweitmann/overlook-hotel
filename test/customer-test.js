import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import customerTestData from '../src/testing-data/customer-test-data';

describe('Customer', () => {
  let customer;

  describe('Properties', () => {

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
    });

    it('should have a name', () => {
      expect(customer.name).to.be.a('String');
      expect(customer.name).to.deep.equal('Leatha Ullrich');
    });

    it('should keep track of its bookings', () => {
      expect(customer.bookings).to.be.an('Array');
    });

    it('should know the total cost of its bookings', () => {
      expect(customer.totalCost).to.deep.equal(0);
    });
  });

  describe('Methods', () => {

    it('should have methods', () => {
    });
  });
});
