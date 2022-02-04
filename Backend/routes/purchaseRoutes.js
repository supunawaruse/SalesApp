const purchaseController = require('../controllers/purchaseController')

const router = require('express').Router();

router.route('/').get(purchaseController.getAllPurchases).post(purchaseController.addPurchase)
router.route('/:id').delete(purchaseController.deletePurchase).get(purchaseController.getPurchaseById)

module.exports = router;
