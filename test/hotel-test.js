import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/classes/Hotel';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import customerTestData from '../src/testing-data/customer-test-data';
import bookingTestData from '../src/testing-data/booking-test-data';
import roomTestData from '../src/testing-data/room-test-data';

describe('Hotel', () => {
  let hotel;

  beforeEach(() => {
    hotel = new Hotel(
      roomTestData.rooms.map(room => new Room(room)),
      bookingTestData.bookings.map(booking => new Booking(booking)),
      customerTestData.customers
    );
  });

  describe('Properties', () => {

    it('should be a function', () => {
      expect(Hotel).to.be.a('function');
    });
    
  });

  describe('Methods', () => {


  });
});
