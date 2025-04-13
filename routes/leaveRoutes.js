const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/LeaveController');


// Employee submits a leave request
router.post('/submit',  leaveController.submitLeaveRequest);

// HR retrieves all leave requests
router.get('/all',  leaveController.getAllLeaveRequests);


router.get("/leavebyuserid/:id",leaveController.getAllLeaveRequestsByUserId)

// HR updates leave request status
router.put('/:leaveId/status', leaveController.updateLeaveStatus);

module.exports = router;
