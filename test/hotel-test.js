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
      roomTestData.rooms,
      bookingTestData.bookings,
      customerTestData.customers
    );
  });

  describe('Properties', () => {

    it('should be a function', () => {
      expect(Hotel).to.be.a('function');
    });

    it('should be an instantiation of Hotel', () => {
      expect(hotel).to.be.an.instanceof(Hotel);
    });

    it('should have a list of all guests', () => {
      expect(hotel.guests).to.be.an('Array');
      expect(hotel.guests.length).to.deep.equal(3);
    });

    it('should have a list of all rooms', () => {
      expect(hotel.allRooms).to.be.an('Array');
      expect(hotel.allRooms.length).to.be.deep.equal(5);
      expect(hotel.allRooms[0]).to.be.an.instanceof(Room);
    });

    it('should have a list of booked rooms', () => {
      expect(hotel.bookedRooms).to.be.an('Array');
      expect(hotel.bookedRooms.length).to.deep.equal(5);
    });

  });

  describe('Methods', () => {


  });
});
