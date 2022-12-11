import { connectToDb } from "./utils/db";
import { connectProducer, disconnectFromProducer } from "./utils/kafka";
import { createServer } from "./utils/server";

async function gracefulShutdown(app: Awaited<ReturnType<typeof createServer>>) {
  console.log("Graceful shutdown");

  await app.close();

  await disconnectFromProducer();

  process.exit(0);
}

async function main() {
  const app = createServer();

  await connectToDb();

  await connectProducer();

  app.listen({
    port: 3000,
    host: "0.0.0.0",
  });

  console.log("Message service ready at http://localhost:3000");
}

main();
