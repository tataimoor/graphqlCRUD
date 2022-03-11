import { FastifyReply, FastifyRequest, RequestHeadersDefault } from "fastify";

export const getHome = (req:FastifyRequest,res:FastifyReply) => {
    res.send({ msg:"Hello World"})
};
