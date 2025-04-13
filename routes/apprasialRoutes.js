const express = require('express');
const router = express.Router();
const appraisalController = require('../controllers/ApprasialController');

router.post('/create', appraisalController.createAppraisal);
router.get('/', appraisalController.getAllAppraisals);
router.get('/:id', appraisalController.getAppraisalById);
router.put('/:id', appraisalController.updateAppraisal);
router.delete('/:id', appraisalController.deleteAppraisal);
router.get('/employee/:employeeId', appraisalController.getAppraisalsByEmployee);

module.exports = router;
