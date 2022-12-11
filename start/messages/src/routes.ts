import { FastifyInstance } from "fastify";
import { FromSchema } from "json-schema-to-ts";
import { Message, MessageModel } from "./models/message.model";

const createProductBody = {
  type: "object",
  properties: {
    text: { type: "string" },
  },
  required: ["text"],
} as const;

export async function routes(app: FastifyInstance) {
  app.post<{ Body: FromSchema<typeof createProductBody> }>(
    "/",
    {
      schema: {
        body: createProductBody,
      },
    },
    async (req, reply) => {
      const { text } = req.body;

      const message = await MessageModel.create({
        text,
      });

      return reply.code(201).send(message);
    }
  );
}
