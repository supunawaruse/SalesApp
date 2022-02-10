const productController = require('../controllers/productController');

const router = require('express').Router();

router.route('/withoutStock').get(productController.getAllProductsWithoutStock)
router.route('/').get(productController.getAllProducts).post(productController.addProduct)
router.route('/:id').delete(productController.deleteProduct).put(productController.updateProduct).get(productController.getAllProductById)
router.route('/productStock/:id').get(productController.getProductStock)


module.exports = router;
