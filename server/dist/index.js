"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const typeDefs_1 = __importDefault(require("./graphql/schemas/typeDefs"));
const resolvers_1 = __importDefault(require("./graphql/resolvers/resolvers"));
7;
const server = new server_1.ApolloServer({
    typeDefs: typeDefs_1.default.definitions,
    resolvers: resolvers_1.default,
});
(0, standalone_1.startStandaloneServer)(server, {
    listen: { port: 4000 },
}).then((result) => {
    console.log(`🚀  Server ready at: ${result.url}`);
}).catch((error) => {
    console.error("Failed to start server with error: ", error);
});
