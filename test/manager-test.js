import chai from 'chai';
const expect = chai.expect;
import Manager from '../src/classes/Manager';
import Customer from '../src/classes/Customer';
import Hotel from '../src/classes/Hotel';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
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
      customerTestData.costumers
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

  });

  describe('Methods', () => {

    it('should have methods', () => {

    });
  });
});
