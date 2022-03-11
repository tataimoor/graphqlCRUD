import { config } from "dotenv";
import Fastify from "fastify";
config();

export const fastify = Fastify({  disableRequestLogging: true,logger:true });
