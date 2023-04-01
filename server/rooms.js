let rooms = [];

const addRoom = (roomName) => {
  if (!rooms.some((r) => r.name === roomName)) {
    rooms.push({ name: roomName });
  }
};

const removeRoom = (roomName) => {
  const index = rooms.findIndex((room) => room.name === roomName);
  if (index !== -1) {
    rooms.splice(index, 1);
  }
};

const getRooms = () => {
  return rooms;
};

const setRooms = (newRooms = []) => {
  rooms = newRooms;
};

const setVideoUrlForRoom = (roomName, videoUrl) => {
  for (i = 0; i < rooms.length; i++) {
    if (rooms[i].name === roomName) {
      rooms[i].videoUrl = videoUrl;
    }
  }
};

const getVideoUrlForRoom = (roomName) => {
  for (i = 0; i < rooms.length; i++) {
    if (rooms[i].name === roomName) {
      if (rooms[i].videoUrl) {
        return rooms[i].videoUrl;
      }
    }
  }
};

module.exports = {
  addRoom,
  getRooms,
  setRooms,
  setVideoUrlForRoom,
  getVideoUrlForRoom,
  removeRoom,
};
