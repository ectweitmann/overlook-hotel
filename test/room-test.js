import chai from 'chai';
const expect = chai.expect;
import Room from '../src/classes/Room';
import roomTestData from '../src/testing-data/room-test-data';

describe('Room', () => {
  let room;

  describe('Properties', () => {

    beforeEach(() => {
      room = new Room(roomTestData.rooms[0]);
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
      expect(room.type).to.be.a('String');
      expect(room.type).to.deep.equal('residential suite');
    });

  });
});
