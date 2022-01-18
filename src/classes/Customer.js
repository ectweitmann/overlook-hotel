import Hotel from './Hotel';

class Customer {
  constructor(person) {
    this.id = person.id;
    this.name = person.name;
    this.bookings = [];
    this.totalCost = 0;
  }

  getBookings(hotel) {
    let hotelCopy = JSON.parse(JSON.stringify(hotel.bookedRooms));
    hotelCopy.forEach(booking => {
      if (booking.userID === this.id) {
        booking['roomType'] = hotel.allRooms
          .find(room => room.number === booking.roomNumber).roomType;
        this.bookings.push(booking);
      }
    });
  }

  bookRoom(roomNumber, date) {
    return {
      userID: this.id,
      date: date,
      roomNumber: parseInt(roomNumber)
    };
  }

  determineTotalCost(hotel) {
    this.totalCost = hotel.calculateRevenue(this.id).toFixed(2);
  }
}

export default Customer;
