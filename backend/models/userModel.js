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
  const [rows] = await connection.query('SELECT id, name, price, pro_dec AS description, image_url FROM product');
  connection.release();
  return rows;
};

const createProduct = async ({ name, price, description, image_url }) => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'INSERT INTO product (name, price, pro_dec, image_url) VALUES (?, ?, ?, ?)',
    [name, price, description, image_url]
  );
  connection.release();
  return { id: result.insertId, name, price, description, image_url };
};

const updateProduct = async (id, { name, price, description,image_url }) => {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    'UPDATE product SET name = ?, price = ?, pro_dec = ?, image_url = ? WHERE id = ?',
    [name, price, description, image_url, id]
  );
  connection.release();
  return result.affectedRows;
};

const deleteProduct = async (id) => {
  const connection = await pool.getConnection();
  const [result] = await connection.query('DELETE FROM product WHERE id = ?', [id]);
  connection.release();
  return result.affectedRows;
}

//single product from query

const singleProduct = async (id) => {
  const connection = await pool.getConnection();
  const [result] = await connection.query("SELECT * FROM products WHERE id = ?", [id]);
  connection.release();
  // return result;
  return result[0];
  console.log(result.affectedRows);

}

// app.get("/products/:id", async (req, res) => {
//   const { id } = req.params;
//   const product = await db.query(
//     "SELECT * FROM products WHERE id = ?",
//     [id]
//   );
//   res.json(product[0]);
// });

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  singleProduct
};
