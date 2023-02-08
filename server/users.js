const users = [];

const addUser = ({ id, name, room }) => {
  const user = { id, name, room };

  const index = users.findIndex((user) => user.name === name);
  if (index === -1) {
    users.push(user);
  }
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index != -1) {
    return users.splice(index, 1)[0];
  }
};

const getUserById = (id) => users.find((user) => user.id === id);

const getUserByName = (name) => users.find((user) => user.name === name);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getOtherUserInRoom = (room, newUser) =>
  users.filter((user) => user.room === room && user.id !== newUser.id)[0];

module.exports = {
  addUser,
  removeUser,
  getUserById,
  getUserByName,
  getUsersInRoom,
  getOtherUserInRoom,
};
