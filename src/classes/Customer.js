class Customer {
  constructor(person) {
    this.id = person.id;
    this.name = person.name;
    this.bookings = [];
    this.totalCost = 0;
  }
}

export default Customer;
