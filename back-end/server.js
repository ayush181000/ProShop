import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // Body parser

app.get('/', (req, res) => {
  res.send('server running');
});

app.use('/products', productRoutes);
app.use('/users', usersRoutes);
app.use('/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// Middleware
app.use(notFound);
app.use(errorHandler);

// PORT
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server runnning in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
