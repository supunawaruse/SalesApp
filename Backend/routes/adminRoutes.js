const adminController = require('../controllers/adminController')

const router = require('express').Router();

router.route('/').get(adminController.getAllAdmins).post(adminController.addAdmin)
router.route('/:id').get(adminController.getAdminById).put(adminController.updateAdmin).delete(adminController.deleteAdmin)

module.exports = router;
