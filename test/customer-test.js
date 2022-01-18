import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import Hotel from '../src/classes/Hotel';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import customerTestData from '../src/testing-data/customer-test-data';
import bookingTestData from '../src/testing-data/booking-test-data';
import roomTestData from '../src/testing-data/room-test-data';

describe('Customer', () => {
  let customer;
  let hotel;

  beforeEach(() => {
    customer = new Customer(customerTestData.customers[0]);
    hotel = new Hotel(
      roomTestData.rooms,
      bookingTestData.bookings,
      customerTestData.costumers
    );
  });

  describe('Properties', () => {

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

    it('should be to get a list of their hotel bookings', () => {
      customer.getBookings(hotel);

      expect(customer.bookings.length).to.deep.equal(2);
      expect(customer.bookings).to.deep.equal([
        {
          id: "5fwrgu4i7k55hl6x8",
          userID: 1,
          date: "2022/05/22",
          roomNumber: 2,
          roomType: 'suite'
        },
        {
          id: '5fwrgu4i7k55hl6t8',
          userID: 1,
          date: '2022/01/22',
          roomNumber: 5,
          roomType: 'single room'
        }
      ]);
    });

    it('should be able to get the total cost of their bookings', () => {
      customer.determineTotalCost(hotel);

      expect(customer.totalCost).to.deep.equal('817.55');
    });
  });
});
