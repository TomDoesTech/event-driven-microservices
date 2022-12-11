import { Schema, model, InferSchemaType } from "mongoose";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvqxyz0123456789", 10);

const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  messageId: {
    type: String,
    required: true,
    default: nanoid(),
  },
});

export const MessageModel = model("Message", messageSchema);

export type Message = InferSchemaType<typeof messageSchema>;
