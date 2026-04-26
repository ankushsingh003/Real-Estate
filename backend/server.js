import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import http from 'http';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.route.js';
import propertyRoutes from './routes/property.route.js';
import paymentRoutes from './routes/payment.route.js';

const app = express();
const PORT = process.env.PORT || 5000;

// DB
connectDB();

// Middlewares
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-rapidapi-key', 'x-rapidapi-host']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/payments', paymentRoutes);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`)
});