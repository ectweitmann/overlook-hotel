import Room from './Room';
import Booking from './Booking';

class Hotel {
  constructor(rooms, bookings, guests) {
    this.guests = guests;
    this.allRooms = rooms.map(room => new Room(room));
    this.bookedRooms = bookings.map(booking => new Booking(booking));
    this.availableRooms = [];
  }

  determineAvailableRooms(date) {
    this.availableRooms = this.allRooms.filter(room => {
      let todaysBookedRooms = this.bookedRooms.filter(bookedRoom => bookedRoom.date === date)
        .map(bookedRoom => bookedRoom.roomNumber);
      return todaysBookedRooms.includes(room.number) ? false : true;
    });
  }

  calculateRevenue(parameter) {
    let key = Number.isInteger(parameter) ? 'userID' : 'date';
    let filteredRoomNums = this.bookedRooms.reduce((roomNums, currentBooking) => {
      currentBooking[key] === parameter && roomNums.push(currentBooking.roomNumber);
      return roomNums;
    }, []);
    return this.allRooms.reduce((totalCost, currentRoom) => {
      totalCost += filteredRoomNums.includes(currentRoom.number) ? currentRoom.costPerNight : 0;
      return totalCost;
    }, 0);
  }

  filterByRoomType(roomType) {
    return this.availableRooms.filter(room => room.roomType === roomType);
  }

  determineOccupancy(date) {
    let percentOccupied = (1 - (this.availableRooms.length / this.allRooms.length)) * 100;
    return `%${percentOccupied.toFixed(2)}`;
  }
}

export default Hotel;
