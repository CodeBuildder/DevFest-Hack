import HttpError, { RequestTimeout } from "http-errors";
import * as mongodb from "mongodb";
import { getClient } from "../db/db.connect";

export const acceptRequestOnUssd = async (contact: string) => {
  const client: mongodb.MongoClient = await getClient();
  const requestResult = await client
    .db()
    .collection("request")
    .findOneAndUpdate(
      { workerContact: contact },
      { $set: { accepted: true } },
      { returnOriginal: false }
    );
  if (requestResult.lastErrorObject.n !== 1) {
    throw HttpError(404, "Request could not be processed right now");
  }
  return requestResult;
};
