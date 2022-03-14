import {
  upsertUser,
  deleteUser,
  getUser,
  getUsers,
} from "./../controller/userController.js";
export const resolver = {
  Query: {
    users: getUsers,
    user: getUser,
    // addUser
  },
  Mutation: {
    user: upsertUser,
    deleteUser: deleteUser,
  },
};
