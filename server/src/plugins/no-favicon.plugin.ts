import { FastifyInstance } from "fastify";
import { StatusCodes } from "http-status-codes";

export async function noFavicon(fastify: FastifyInstance) {
  fastify.get("/favicon.ico", (_, reply) => {
    reply.code(StatusCodes.NOT_FOUND).send();
  });
}
