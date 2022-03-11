import { getHome } from "./controller/homeController.js";
import { fastify } from "./config.js";

fastify.get("/", getHome);

export {fastify as server}
