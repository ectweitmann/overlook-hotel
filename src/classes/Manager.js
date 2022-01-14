import Customer from './Customer';

class Manager {
  constructor(hotel) {
    this.hotel = hotel;
    this.selectedCustomer = null;
  }

  selectCustomer(name) {
    this.selectedCustomer = new Customer(this.hotel.guests.find(guest => guest.name === name));
    this.selectedCustomer.getBookings(this.hotel);
    this.selectedCustomer.determineTotalCost(this.hotel);
  }

  // ADD METHODS TO ADD/REMOVE A BOOKING ONCE NETWORK REQUEST FUNCTIONS ARE MADE

}

export default Manager;
