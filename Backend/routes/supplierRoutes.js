const supplierController = require('../controllers/supplierController');
const { route } = require('./adminRoutes');

const router = require('express').Router();

router.route('/').get(supplierController.getAllSuppliers).post(supplierController.addSupplier)
router.route('/:id').get(supplierController.getSupplierById).put(supplierController.updateSupplier).delete(supplierController.deleteSupplier)
router.route('/supplierPurchase/:id').get(supplierController.getSupplierPuchases)

module.exports = router;
