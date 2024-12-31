"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDb = void 0;
const mongodb_1 = require("mongodb");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster-deepway`;
// const mongoUri = `mongodb://0.0.0.0:27017`;
// const isProd = process.env.NODE_ENV === "production";
const runDb = () => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    if (process.env.NODE_ENV === "production") {
        console.log(process.env);
        // Использование реальной базы данных
        client = new mongodb_1.MongoClient(mongoUri, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
            tlsAllowInvalidCertificates: true,
        });
        yield client.connect();
        try {
            yield client.db("articles").command({ ping: 1 });
            console.log("Connected successfuly to mongo server");
        }
        catch (error) {
            console.error("Ошибка при подключении к базе данных", error);
            yield client.close();
        }
    }
    else {
        // Использование mongodb-memory-server для моков
        const mongod = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongod.getUri();
        client = new mongodb_1.MongoClient(uri);
        yield client.connect();
    }
    return client;
});
exports.runDb = runDb;
