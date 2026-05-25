const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '987',
  database: process.env.DB_NAME || 'crud',
  // database: process.env.DB_NAME || 'authentication',


  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

if (process.env.NODE_ENV === 'development') {
  pool.getConnection()
    .then((connection) => {
      console.log('Connected to MySQL database');
      connection.release();
    })
    .catch((error) => {
      console.error('Error connecting to MySQL database:', error);
    });
  }

module.exports = pool;
