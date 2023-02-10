let rooms = [];

const addRoom = (room) => {
  if (!rooms.includes(room)) {
    rooms.push(room);
  }
};

const getRooms = () => {
  return rooms;
};

const setRooms = (newRooms = []) => {
  rooms = newRooms
};

module.exports = { addRoom, getRooms, setRooms };
