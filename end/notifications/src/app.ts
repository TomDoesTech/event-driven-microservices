import { connectConsumer, disconnectConsumer } from "./utils/kafka";
import { createServer } from "./utils/server";

async function gracefulShutdown(app: Awaited<ReturnType<typeof createServer>>) {
  console.log("Shutting down...");

  await app.close();

  await disconnectConsumer();
  process.exit(0);
}

async function main() {
  const app = createServer();

  await connectConsumer();

  await app.listen({
    port: 4000,
    host: "0.0.0.0",
  });

  console.log("Notification service ready at http://localhost:4000");
}

main();
