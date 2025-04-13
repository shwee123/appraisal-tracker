const Appraisal = require('../models/ApprisalModel');

// Create appraisal
exports.createAppraisal = async (req, res) => {
  try {
    const appraisal = new Appraisal(req.body);
    await appraisal.save();
    res.status(201).json({ message: 'Appraisal created successfully', appraisal });
  } catch (error) {
    res.status(500).json({ message: 'Error creating appraisal', error });
  }
};

// Get all appraisals
exports.getAllAppraisals = async (req, res) => {
  try {
    const appraisals = await Appraisal.find().populate('employeeId createdBy');
    res.status(200).json(appraisals);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching appraisals', error });
  }
};

// Get appraisal by ID
exports.getAppraisalById = async (req, res) => {
  try {
    const appraisal = await Appraisal.findById(req.params.id).populate('employeeId createdBy');
    if (!appraisal) {
      return res.status(404).json({ message: 'Appraisal not found' });
    }
    res.status(200).json(appraisal);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving appraisal', error });
  }
};

// Update appraisal
exports.updateAppraisal = async (req, res) => {
  try {
    const updated = await Appraisal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Appraisal not found' });
    }
    res.status(200).json({ message: 'Appraisal updated successfully', updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appraisal', error });
  }
};

// Delete appraisal
exports.deleteAppraisal = async (req, res) => {
  try {
    const deleted = await Appraisal.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Appraisal not found' });
    }
    res.status(200).json({ message: 'Appraisal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appraisal', error });
  }
};

// Get appraisals by employee
exports.getAppraisalsByEmployee = async (req, res) => {
  try {
    const appraisals = await Appraisal.find({ employeeId: req.params.employeeId }).populate('createdBy');
    res.status(200).json(appraisals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee appraisals', error });
  }
};
