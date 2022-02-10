const stockController = require('../controllers/stockController')

const router = require('express').Router();

router.route('/').get(stockController.getAllStocks).post(stockController.addStock)
router.route('/:id').get(stockController.getStockById).put(stockController.updateStock).delete(stockController.deleteStock)
router.route('/product/:id').get(stockController.getStockByProductId)

module.exports = router;
