import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import db from './config/db.js';
import { errorHandler, pageNotFound } from './middlewares/error.middlewares.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Connect to MongoDB
db()
  .then(() => {
    console.log('Connected to MongoDB');
    console.log(`Environment Port: ${process.env.PORT}`);
    console.log(`Using Port: ${port}`);

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Routes
    app.use(router);

    // Default route
    app.get('/', (request, response) => response.send({ app: 'vendoor' }));

    // Error handling middleware
    app.use(pageNotFound);
    app.use(errorHandler);

    // Start server
    app.listen(port, (error) => {
      if (error) {
        console.error(`Failed to start server on port ${port}`, error);
        process.exit(1);
      } else {
        console.log(`Server is listening on port ${port}`);
      }
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });
