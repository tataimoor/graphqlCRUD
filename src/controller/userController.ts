import { MUser } from "./../models/MUser.js";
import graphqlFields from "graphql-fields";
import { IUser } from "../types/IUsers.js";
/**
 * get Userss
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */
export const getUsers = async (_: any, data: any, body: any, select: any) => {
  let promises: Promise<any>[] = [];
  let take = select.variableValues?.take ?? 10;
  let skip = select.variableValues?.skip ?? 0;

  const fieldList = graphqlFields(select);
  const keys = Object.keys(fieldList.docs);

  promises.push(
    MUser.find({}, keys.join(" "), { limit: take, skip }).lean().exec()
  );

  if (fieldList.count) {
    promises.push(MUser.countDocuments().lean().exec());
  }

  const [user, count] = await Promise.all(promises);
  return { docs: user, count };
};

/**
 * @description Adds User
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */
export const addUser = async (
  _: any,
  data: { input: IUser },
  body: any,
  select: any
) => {
  return await MUser.create(data.input);
};
/**
 * @description Updates User
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */

export const updateUser = async (
  _: any,
  data: { input: IUser },
  body: any,
  select: any
) => {
  const fieldList = graphqlFields(select);
  const keys = Object.keys(fieldList);

  const user = await MUser.findOneAndUpdate(
    { _id: data.input._id },
    { $set: data.input },
    { projection: keys.join(" "), new: true }
  );
  return user;
};

/**
 * @description
 */

export const deleteUser = async (
  _: any,
  data: { input: number },
  body: any,
  select: any
) => {
  const fieldList = graphqlFields(select);
  const keys = Object.keys(fieldList);

  const user = await MUser.findOneAndDelete(
    { _id: data.input },
    { projection: keys.join(" ") }
  );
  return user;
};

/**
 * get Userss
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */
export const getUser = async (_: any, data: any, body: any, select: any) => {
  let id = select.variableValues.id;
  const fieldList = graphqlFields(select);
  const keys = Object.keys(fieldList);
  const user = await MUser.findById(id, keys.join(" "));
  return user;
};

