const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getProducts);
router.post('/', userController.createProduct);
router.patch('/:id', userController.updateProduct);


module.exports = router;

