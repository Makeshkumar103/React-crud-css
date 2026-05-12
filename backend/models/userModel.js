const pool = require('../config/db');

const getAllUsers = async () => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM users');
  connection.release();
  return rows;
};

const getAllProducts = async () => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT * FROM products');
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

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getAllProducts
};
