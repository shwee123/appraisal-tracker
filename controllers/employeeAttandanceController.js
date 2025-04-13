const Attendance = require('../models/employeeAttandanceModel');

// Mark attendance
exports.markAttendance = async (req, res) => {
  const { user, status } = req.body;

  if (!user || !status) {
    return res.status(400).json({ message: 'Employee ID and status are required.' });
  }

  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingRecord = await Attendance.findOne({
      user,
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    if (existingRecord) {
      return res.status(400).json({ message: 'Attendance for today has already been marked.' });
    }

    const attendance = new Attendance({ user, status });
    await attendance.save();

    res.status(201).json({ message: 'Attendance marked successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking attendance.', error });
  }
};

// Get attendance records
exports.getAttendanceRecords = async (req, res) => {
    console.log("calll...")
  const { employeeId } = req.params;
  const { startDate, endDate } = req.query;

  if (!employeeId) {
    return res.status(400).json({ message: 'Employee ID is required.' });
  }

  const query = { employeeId };

  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  try {
    const records = await Attendance.find(query).sort({ date: 1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving attendance records.', error });
  }
};


exports.getTodaysAttendance1 = async (req, res) => {
    console.log("ok......")
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    console.log("herere......")
    const records = await Attendance.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ employeeId: 1 }); // Optional: sort by employee
    console.log("called...",records)

    res.status(200).json(records);
  } catch (error) {
    console.log("here...")
    res.status(500).json({
      message: 'Error retrieving today\'s attendance records.',
      error,
    });
  }
};
