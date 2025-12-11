// server/config.js
const config = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET || "change_this_in_production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",

  // Primary MongoDB connection string (must be set in env)
  mongoUri: process.env.MONGODB_URI || process.env.MONGO_URI || null,

  // Legacy/local fallback (only used if no mongoUri provided)
  localMongoUri:
    "mongodb://" +
    (process.env.MONGO_HOST || "localhost") +
    ":" +
    (process.env.MONGO_PORT || "27017") +
    "/" +
    (process.env.MONGO_DB || "mernproject"),
};

export default config;
