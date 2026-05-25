require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require("multer");
const cloudinary = require("cloudinary").v2

const userRoutes = require('./routes/userRoutes');
const userProduct =require('./routes/userProduct');

const pool = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.SERVER_PORT || 8000;

app.use(express.json());

cloudinary.config({
  api_key :process.env.API_KEY,
  cloud_name :process.env.CLOUD_NAME,
  api_secret :process.env.API_SECRET
});

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
);


app.use('/users', userRoutes);
app.use('/products', userProduct);
app.use('/api/auth', authRoutes);
// app.use('/products', userProducts);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log('Testing database connection...');
  pool.getConnection()
    .then((connection) => {
      console.log('Connected to MySQL database');
      connection.release();
    })
    .catch((error) => {
      console.error('Error connecting to MySQL database:', error);
    });
});