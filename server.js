// server.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the server folder explicitly
dotenv.config({ path: path.resolve(__dirname, "server", ".env") });

// Now safe to import modules that read process.env
import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";

// Use native promises
mongoose.Promise = global.Promise;

// Determine MongoDB URI (config or env or local fallback)
const uri = config.mongoUri || process.env.MONGODB_URI || config.localMongoUri || null;

if (!uri) {
  console.error("No MongoDB URI configured. Set MONGODB_URI in server/.env or update config.js.");
  process.exit(1);
}

// Connect to MongoDB (modern mongoose does not need useNewUrlParser/useUnifiedTopology)
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start server only after DB connection
    const port = Number(process.env.PORT || config.port || 3000);
    app.get("/", (req, res) => {
      res.json({ message: "Welcome to My Portfolio application." });
    });

    app.listen(port, (err) => {
      if (err) {
        console.error("Server start error:", err);
        return;
      }
      console.info("Server started on port %s.", port);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message || err);
    process.exit(1);
  });

// Optional: log connection errors after initial connect attempt
mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});
