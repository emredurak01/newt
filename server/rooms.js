const rooms = [];

const addRoom = (room) => {
  if (!rooms.includes(room)) {
    rooms.push(room);
  }
};

//TODO: Remove room

const getRooms = () => {
  return rooms;
};

module.exports = { addRoom, getRooms };
