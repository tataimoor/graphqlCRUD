import "./config.js";
import { resolver } from "./apollo/resolver.js";
import { TypeDef } from "./apollo/schema.js";
import { server } from "./router.js";
import { ApolloServer } from "apollo-server-fastify";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginInlineTrace } from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";
import { RouteGenericInterface } from "fastify/types/route";

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  };
}

async function startApolloServer(typeDefs: any, resolvers: any) {
  // const app = fastify();
  const appolo = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      fastifyAppClosePlugin(server),
      ApolloServerPluginDrainHttpServer({ httpServer: server.server }),    ],
  });

  await appolo.start();
  server.register(appolo.createHandler());
  // server.addHook(
  //   "preHandler",
  //   (
  //     request: FastifyRequest,
  //     reply: FastifyReply,
  //     done: HookHandlerDoneFunction
  //   ) => {
  //     const queryObject = (request.body as any)?.query
  //       .replaceAll(" ", "")
  //       .replaceAll("\n", "")
  //       .replaceAll("}", "");
  //     console.log(queryObject);
  //     done();
  //   }
  // );
  
  await server.listen(process.env.PORT ?? 4000);
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${appolo.graphqlPath}`
  );
}

startApolloServer(TypeDef, resolver);
