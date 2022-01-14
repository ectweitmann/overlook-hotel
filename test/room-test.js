import chai from 'chai';
const expect = chai.expect;
import Room from '../src/classes/Room';
import roomTestData from '../src/testing-data/room-test-data';

describe('Room', () => {
  let room;
  let room2;

  describe('Properties', () => {

    beforeEach(() => {
      room = new Room(roomTestData.rooms[0]);
      room2 = new Room(roomTestData.rooms[1]);
    });

    it('should be a function', () => {
      expect(Room).to.be.a('function');
    });

    it('should be an instantiation of Room', () => {
      expect(room).to.be.an.instanceof(Room);
    });

    it('should have a room number', () => {
      expect(room.number).to.be.a('Number');
      expect(room.number).to.be.deep.equal(1);
    });

    it('should have a room type', () => {
      expect(room.roomType).to.be.a('String');
      expect(room.roomType).to.deep.equal('residential suite');
    });

    it('should or should not have a bidet', () => {
      expect(room.bidet).to.be.a('Boolean');
      expect(room.bidet).to.deep.equal(true);
      expect(room2.bidet).to.deep.equal(false);
    });

    it('should have a bed size', () => {
      expect(room.bedSize).to.be.a('String');
      expect(room.bedSize).to.deep.equal('queen');
    });

    it('should know how many beds it has', () => {
      expect(room.numBeds).to.deep.equal(1);
    });

    it('should have its cost per night', () => {
      expect(room.costPerNight).to.deep.equal(358.40);
    });
  });
});
