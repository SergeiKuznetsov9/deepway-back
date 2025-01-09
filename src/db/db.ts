import { MongoClient, ServerApiVersion } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster-deepway`;
// const mongoUri = `mongodb://0.0.0.0:27017`;

export const runDb = async () => {
  let client: MongoClient;

  if (process.env.NODE_ENV === "production") {
    // Использование реальной базы данных
    client = new MongoClient(mongoUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      tlsAllowInvalidCertificates: true,
    });

    try {
      await client.connect();
      await client.db("articles").command({ ping: 1 });
      console.log("Connected successfuly to mongo server");
    } catch (error) {
      console.error("Ошибка при подключении к базе данных", error);
      await client.close();
    }
  } else {
    // Использование mongodb-memory-server для моков
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    client = new MongoClient(uri);
    await client.connect();
    console.log("Connected successfuly to MOCK mongo server");
  }

  return client;
};
