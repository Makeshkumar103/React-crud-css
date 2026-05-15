const pool = require('../config/db');


// user form query

const getAllUsers = async () => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM users');
  connection.release();
  return rows;
};

const createUser = async ({ name, age, email }) => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'INSERT INTO users (name, age, email) VALUES (?, ?, ?)',
    [name, age, email]
  );
  connection.release();
  return { id: result.insertId, name, age, email };
};

const updateUser = async (id, { name, age, email }) => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'UPDATE users SET name = ?, age = ?, email = ? WHERE id = ?',
    [name, age, email, id]
  );
  connection.release();
  return result.affectedRows;
};

const deleteUser = async (id) => {
  const connection = await pool.getConnection();
  const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);
  connection.release();
  return result.affectedRows;
};

// product form query

const getAllProducts = async () => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM product');
  connection.release();
  return rows;
};

const createProduct = async ({ name, price, description }) => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
    [name, price, description]
  );
  connection.release();
  return { id: result.insertId, name, price, description };
};

const updateProduct = async (id, { name, price, description }) => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
    [name, price, description, id]
  );
  connection.release();
  return result.affectedRows;
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getAllProducts,
  createProduct
};
