const customerController = require('../controllers/customerController')

const router = require('express').Router();

router.route('/').get(customerController.getAllCustomers).post(customerController.addCustomer)
router.route('/:id').get(customerController.getCustomerById).put(customerController.updateCustomer).delete(customerController.deleteCustomer)
router.route('/customerSale/:id').get(customerController.getCustomerSales)

module.exports = router;
