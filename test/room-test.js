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

    it('should have properties', () => {

    });
  });

  describe('Methods', () => {

    it('should have methods', () => {
    });
  });
});
