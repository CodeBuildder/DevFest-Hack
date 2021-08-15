import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";
import { workerPosts, postSchema, postType, ServiceType } from "./post.schema";
import { userDB, userInterface } from "../user/user.schema";
import findDistance from "../utils/calc.distance";
import HttpError from "http-errors";

export const workerPost = async (data: postType, user: userInterface) => {
  await postSchema.validate(data).catch((err) => {
    throw HttpError(400, err.errors.toString());
  });
  const workerPost = {
    pay: data.pay,
    services: data.services,
    timeslots: data.timeslots,
  };
  const client: mongodb.MongoClient = await getClient();
  const DB = await client.db().collection<workerPosts>("post");
  const addData = { user, ...workerPost };
  const add = await DB.insertOne(addData);
  if (add.insertedCount <= 0) {
    throw HttpError(500, "MongoDB error");
  }
  return { _id: add.insertedId };
};

export const getPost = async (id: string) => {
  const client: mongodb.MongoClient = await getClient();
  const Posts = await client
    .db()
    .collection<workerPosts>("post")
    .findOne({ _id: new mongodb.ObjectId(id) });
  if (Posts) {
    return Posts;
  } else {
    throw HttpError(404, "Post could not be found");
  }
};
export const getSingleWorkerPost = async (user: userDB) => {
  const client: mongodb.MongoClient = await getClient();
  const singleWorkerPosts = await client
    .db()
    .collection<workerPosts>("post")
    .find({ "user._id": new mongodb.ObjectID(user._id) })
    .toArray();

  return singleWorkerPosts;
};
