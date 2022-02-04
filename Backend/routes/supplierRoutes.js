const supplierController = require('../controllers/supplierController')

const router = require('express').Router();

router.route('/').get(supplierController.getAllSuppliers).post(supplierController.addSupplier)
router.route('/:id').get(supplierController.getSupplierById).put(supplierController.updateSupplier).delete(supplierController.deleteSupplier)

module.exports = router;
