import http from 'http';
import app from '../app.js';
import { logger } from '../utils/helpers.js';
import connectDB from '../connections/db.js';
import { loadOrgConfig } from '../loaders/config-loader.js';

const startServer = async () => {
  try {
    await connectDB()
    await loadOrgConfig();
    logger.info('Organization config loaded');

    const port = process.env.PORT || 3000;
    app.set('port', port);

    const server = http.createServer(app);

    server.listen(port, () => {
      logger.info(`Server running on port ${port} | ${process.env.NODE_ENV || 'development'}`);
    });

    server.on('error', (err) => {
      logger.error('Server error:', err);
      process.exit(1);
    });
  }
  catch (err) {
    console.log(err)
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer()