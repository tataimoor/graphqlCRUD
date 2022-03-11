import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "./../controller/userController.js";
export const resolver = {
  Query: {
    users: getUsers,
    user: getUser,
    // addUser
  },
  Mutation: {
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
  },
};
