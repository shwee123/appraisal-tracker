const Leave = require('../models/LeaveModel');

// Employee submits a leave request
exports.submitLeaveRequest = async (req, res) => {
  const { leaveType, startDate, endDate, reason,employeeId } = req.body;
  //const employeeId = req.user.id; // Assume employee ID is available in the authenticated user object

  if (!leaveType || !startDate || !endDate || !reason) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newLeave = new Leave({
      employeeId,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();
    res.status(201).json({ message: 'Leave request submitted successfully.', leave: newLeave });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting leave request.', error });
  }
};

// HR retrieves all leave requests
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await Leave.find().populate('employeeId', 'firstName lastName department');
    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving leave requests.', error });
  }
};

exports.getAllLeaveRequestsByUserId = async (req, res) => {
    try {
      const leaveRequests = await Leave.find({employeeId:req.params.id}).populate('employeeId', 'firstName lastName department');
      res.status(200).json(leaveRequests);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving leave requests.', error });
    }
  };
  
// HR approves or rejects a leave request
exports.updateLeaveStatus = async (req, res) => {
  const { leaveId } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value.' });
  }

  try {
    const leaveRequest = await Leave.findById(leaveId);

    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found.' });
    }

    leaveRequest.status = status;
    await leaveRequest.save();
    res.status(200).json({ message: `Leave request ${status} successfully.`, leave: leaveRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error updating leave request status.', error });
  }
};
