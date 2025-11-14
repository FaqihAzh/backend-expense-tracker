import app from "./app.js";
import Logger from "./utils/logger.js";
import { config } from "./config/env.js";

const startServer = async () => {
  try {
    app.listen(config.port, () => {
      Logger.info(`Server is running on port ${config.port}`);
      Logger.info(`Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    Logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

process.on('SIGINT', () => {
  Logger.info('Server shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  Logger.info('Server shutting down...');
  process.exit(0);
});

startServer();