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

  });

  describe('Methods', () => {

    it('should have methods', () => {
    });
  });
});
