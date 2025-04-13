const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/employeeAttandanceController');

// POST: Mark attendance
router.post('/mark', attendanceController.markAttendance);
// GET: Get attendance records
router.get('/:employeeId', attendanceController.getAttendanceRecords);
router.get("/today/today1",attendanceController.getTodaysAttendance1)

module.exports = router;
