let rooms = [];

const addRoom = (room) => {
  if (!rooms.some((r) => r.name === room.name)) {
    rooms.push(room);
  }
};

const getRooms = () => {
  return rooms;
};

const setRooms = (newRooms = []) => {
  rooms = newRooms;
};

const setVideoUrlForRoom = (roomName, videoUrl) => {
  const roomIndex = rooms.findIndex((r) => r.name === roomName);
  if (roomIndex !== -1) {
    rooms[roomIndex].videoUrl = videoUrl;
  }
};

const getVideoUrlForRoom = (roomName) => {
  const room = rooms.find((r) => r.name === roomName);
  if (room) {
    return room.videoUrl;
  } else {
    return null;
  }
};

module.exports = {
  addRoom,
  getRooms,
  setRooms,
  setVideoUrlForRoom,
  getVideoUrlForRoom,
};
