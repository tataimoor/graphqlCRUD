import { ObjectId } from "mongoose";
import { MComments } from "./../models/MComments.js";
import graphqlFields from "graphql-fields";
import { Comments } from "../types/Comments.d";
import pkg from "mongoose";
const { mongo } = pkg;

/**
 * get Comments
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */
export const getComments = async (_: any, data: any, body: any, select: any) => {
  let promises: Promise<any>[] = [];
  let take = select.variableValues?.take ?? 10;
  let skip = select.variableValues?.skip ?? 0;

  const fieldList = graphqlFields(select);
  const keys = Object.keys(fieldList.docs ?? {});
  if (keys.length)
    promises.push(
        MComments.find({}, keys.join(" "), { limit: take, skip }).lean().exec()
    );

  if (fieldList.count) {
    promises.push(MComments.countDocuments().lean().exec());
  }

  const [comment, count] = await Promise.all(promises);
  return { docs: comment, count: count ? count : comment };
};

/**
 * @description Add Comment
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */
export const upsertComment = async (
  _: any,
  data: { input: Comments },
  body: any,
  select: any
) => {
  const commentData = data.input;
  const _id: any = data.input._id ?? new mongo.ObjectId();
  delete commentData._id;
  console.log(commentData, _id);
  const comment = await MComments.findOneAndUpdate(
    { _id: _id },
    { $set: commentData },
    { upsert: true, new: true }
  );
  return comment;
};

/**
 * @description
 */

export const deleteComment = async (
  _: any,
  data: { input: number },
  body: any,
  select: any
) => {
  const fieldList = graphqlFields(select);
  const keys = Object.keys(fieldList);

  const comment = await MComments.findOneAndDelete(
    { _id: data.input },
    { projection: keys.join(" ") }
  );
  return comment;
};

// /**
//  * get Userss
//  * @param _
//  * @param data
//  * @param body
//  * @param select
//  * @returns
//  */
// export const getUser = async (_: any, data: any, body: any, select: any) => {
//   let id = select.variableValues.id;
//   const fieldList = graphqlFields(select);
//   const keys = Object.keys(fieldList);
//   const user = await MComments.findById(id, keys.join(" "));
//   return user;
// };
