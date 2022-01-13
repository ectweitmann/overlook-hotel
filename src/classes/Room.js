class Room {
  constructor(room) {
    this.number = room.number;
    this.type = room.roomType;
    this.hasBidet = room.bidet;
    this.bedSize = room.bedSize;
    this.numBeds = room.numBeds;
    this.costPerNight = room.costPerNight;
  }
}

export default Room;
