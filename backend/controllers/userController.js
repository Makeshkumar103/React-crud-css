const userModel = require('../models/userModel');

//user crud logic

const validateUserData = ({ name, age, email }) => {
  if (!name || !age || !email) {
    return 'Please fill in all fields';
  }
  return null;
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const createUser = async (req, res) => {
  try {
    const validationError = validateUserData(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    const newUser = await userModel.createUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: 'Could not save user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const validationError = validateUserData(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    const affectedRows = await userModel.updateUser(id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ id, ...req.body });
  } catch (error) {
    return res.status(500).json({ error: 'Could not update user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const affectedRows = await userModel.deleteUser(id);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Could not delete user' });
  }
};

//product crud logic

const validateProductData = ({ name, price, description }) => {
  if (!name || !price || !description) {
    return 'Please fill in all fields';
  }
  return null;
};

const getProducts = async (req, res) => {
  try {
    const products = await userModel.getAllProducts();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const createProduct = async (req, res) => {
  try {
    const validationError = validateProductData(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError})
    }
    const newProduct = await userModel.createProduct(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ error : 'Could not save product' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const validationError = validateProductData(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    const affectedRows = await userModel.updateProduct(id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json({ id, ...req.body });
  } catch (error) {
    return res.status(500).json({ error: 'Could not update product' });
  }
};

//single product
const singleProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const affectedRows = await userModel.singleProduct(id);
    if (!affectedRows) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ message: 'Single Product successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Could not fetch the product' });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getProducts, 
  createProduct,
  updateProduct,
  singleProduct
};
