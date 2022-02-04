const productController = require('../controllers/productController');

const router = require('express').Router();

router.route('/').get(productController.getAllProducts).post(productController.addProduct)
router.route('/:id').delete(productController.deleteProduct).put(productController.updateProduct).get(productController.getAllProductById)

module.exports = router;