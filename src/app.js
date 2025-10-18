import './config/config.js';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import appRoutes from './routes/app.routes.js';
import { errorHandler } from './middlewares/error-handler.js';
import corsOptions from './config/cors.config.js';
import { timeZoneMap } from './config/timezone.config.js';
import { eventLoader } from './loaders/events.js';

process.env.TZ = timeZoneMap[process.env.NODE_ENV] || 'UTC';

const app = express();
(async () => await eventLoader({ app }))();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  cors({
    origin: (origin, callback) => corsOptions.origin(origin, callback, req),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
  })(req, res, next);
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/config', appRoutes);
app.get('api/health', (req, res) => res.json({ ok: true }));

app.use(errorHandler);

export default app;
