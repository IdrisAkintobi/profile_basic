import app from "./app";
import { connectDB } from "./db/connect";

const PORT = process.env.NODE_DOCKER_PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
};

//Start server
startServer().catch(console.log);
