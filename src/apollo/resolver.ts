import {
  upsertUser,
  deleteUser,
  getUser,
  getUsers,
} from "./../controller/userController.js";
import {
  getComments,
  upsertComment,
  deleteComment
} from "./../controller/commentsController.js";
export const resolver = {
  Query: {
    users: getUsers,
    user: getUser,
    comments: getComments
    // addUser
  },
  Mutation: {
    user: upsertUser,
    deleteUser: deleteUser,
    comment: upsertComment,
    deleteComment:deleteComment
  },
};
