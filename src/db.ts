import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster-deepway`;

export const client = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tlsAllowInvalidCertificates: true,
});

export const runDb = async () => {
  try {
    await client.connect();
    await client.db("articles").command({ ping: 1 });
    console.log("Connected successfuly to mongo server");
  } catch (error) {
    console.error("Ошибка при подключении к базе данных", error);
    await client.close();
  }
};
