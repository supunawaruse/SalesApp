const saleController = require('../controllers/saleController')

const router = require('express').Router();

router.route('/').get(saleController.getAllSales).post(saleController.addSale)
router.route('/:id').delete(saleController.deleteSale).get(saleController.getSaleById)

module.exports = router;
