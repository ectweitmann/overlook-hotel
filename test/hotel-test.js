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

    it('should begin with no available rooms', () => {
      expect(hotel.availableRooms).to.be.an('Array');
      expect(hotel.availableRooms.length).to.deep.equal(0);
    });
  });

  describe('Methods', () => {

    it('should be able to determine available rooms on a given date', () => {
      hotel.determineAvailableRooms('2022/04/22');

      expect(hotel.availableRooms.length).to.deep.equal(2);
      expect(hotel.availableRooms).to.deep.equal([
        roomTestData.rooms[1],
        roomTestData.rooms[2]
      ]);
    });

    it('should be able to determine the total cost of a user\'s bookings', () => {
      let totalCost = hotel.calculateCostumersTotalCost(hotel.guests[0].id);

      expect(totalCost).to.deep.equal(817.55);
    });

    it('should be able to filter available rooms by room type', () => {
      hotel.determineAvailableRooms('2022/04/22');
      let filteredListOfAvailableRooms = hotel.filterByRoomType('suite');

      expect(filteredListOfAvailableRooms).to.deep.equal([roomTestData.rooms[1]]);
    });

  });
});
