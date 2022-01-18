import chai from 'chai';
const expect = chai.expect;
import Manager from '../src/classes/Manager';
import Customer from '../src/classes/Customer';
import Hotel from '../src/classes/Hotel';
import customerTestData from '../src/testing-data/customer-test-data';
import bookingTestData from '../src/testing-data/booking-test-data';
import roomTestData from '../src/testing-data/room-test-data';

describe('Manager', () => {
  let manager;
  let hotel;

  beforeEach(() => {
    hotel = new Hotel(
      roomTestData.rooms,
      bookingTestData.bookings,
      customerTestData.customers
    );
    manager = new Manager(hotel);
  });

  describe('Properties', () => {

    it('should be a function', () => {
      expect(Manager).to.be.a('function');
    });

    it('should be an instantiation of Manager', () => {
      expect(manager).to.be.an.instanceof(Manager);
    });

    it('should have a hotel they manage', () => {
      expect(manager.hotel).to.be.an.instanceof(Hotel);
    });

    it('should begin not assisting any customer', () => {
      expect(manager.selectedCustomer).to.deep.equal(null);
    });
  });

  describe('Methods', () => {

    it('should be able to select a customer profile to view', () => {
      manager.selectCustomer('Leatha Ullrich');

      expect(manager.selectedCustomer).to.be.an.instanceof(Customer);
    });
  });
});
