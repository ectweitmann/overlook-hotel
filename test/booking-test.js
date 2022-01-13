import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/Booking';
import bookingTestData from '../src/testing-data/booking-test-data';

describe('Booking', () => {
  let booking;

  describe('Properties', () => {

    beforeEach(() => {
      booking = new Booking(bookingTestData.bookings[0]);
    });

    it('should be a function', () => {
      expect(Booking).to.be.a('function');
    });

    it('should be an instantiation of Booking', () => {
      expect(booking).to.be.an.instanceof(Booking);
    });

    it('should have an id', () => {
      expect(booking.id).to.be.a('String');
      expect(booking.id).to.be.deep.equal("5fwrgu4i7k55hl6sz");
    });

    it('should have a userID', () => {
      expect(booking.userID).to.be.a('Number');
    });
    
  });
});
