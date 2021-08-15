import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";
import { userDB } from "../user/user.schema";
import { requestType, requestSchema, assignType } from "./request.schema";

import HttpError from "http-errors";

export const sendRequest = async (data: requestType, user: userDB) => {
  await requestSchema.validate(data).catch((err: any) => {
    throw HttpError(400, err.errors.toString());
  });
  const client: mongodb.MongoClient = await getClient();
  const insertData = { client: user, ...data };
  const response = await client
    .db()
    .collection("request")
    .insertOne(insertData);
  if (response.insertedCount <= 0) {
    HttpError(500, "Internal Server Error");
  }
  // sms logic should come here
  //send sms to worker using his phone number
  //send details like who has requested the service and the all the post details :)
  return { success: true, _id: response.insertedId };
};

export const findRequest = async (workerId: string) => {
  const client: mongodb.MongoClient = await getClient();
  const requestResult = await client
    .db()
    .collection("request")
    .find({ workerId: workerId, accepted: false })
    .toArray();

  return requestResult;
};
