import fastify from "fastify";

export function createServer() {
  const app = fastify();

  return app;
}
