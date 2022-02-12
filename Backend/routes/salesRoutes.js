const saleController = require('../controllers/saleController')

const router = require('express').Router();


router.route('/').get(saleController.getAllSales).post(saleController.addSale)
router.route('/recent').get(saleController.getRecentSales)
router.route('/toBePaid').get(saleController.getPaidToBe)
router.route('/:id').put(saleController.updateSaleToPaid)


module.exports = router;
