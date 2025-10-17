import mongoose from 'mongoose';
import { CONN_STRING } from '../config/config.js';
import { encodeMongoURI, logger } from '../utils/helpers.js';

const connectDB = async () => {
  try {
    const url = encodeMongoURI(CONN_STRING);
    await mongoose.connect(url);
    
    logger.info('Database connected successfully');

    mongoose.connection.once('open', () => {
      logger.info('Database connected');
    });

    mongoose.connection.on('error', (error) => {
      logger.info(`MongoDB connection error: ${error}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.info('Disconnected from MongoDB');
    });

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        logger.info('MongoDB connection closed due to application termination');
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error(`Database connection failed: ${error}`);
  }
};

export default connectDB;
