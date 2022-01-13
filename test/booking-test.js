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
    
  });
});
