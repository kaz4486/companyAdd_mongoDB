const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Department.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { name } = req.body;
    // dlaczego z {}? jak import?
    const newDepartment = new Department({ name: name });
    await newDepartment.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { name } = req.body;

  try {
    const dep = await Department.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name: name } },
      { new: true }
    );
    if (dep) {
      res.json({
        message: 'OK',
        modifiedDepartment: dep,
      });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
// druga opcja put
// router.put('/departments/:id', async (req, res) => {
//   const { name } = req.body;

//   try {
//     const dep = await Department.findById(req.params.id);
//     if(dep) {
//       dep.name = name;
//       await dep.save();
//       res.json({ message: 'OK' });
//     }
//     else res.status(404).json({ message: 'Not found...' });
//   }
//   catch(err) {
//     res.status(500).json({ message: err });
//   }

// });

exports.delete = async (req, res) => {
  try {
    const dep = await Department.findOneAndDelete({ _id: req.params.id });
    if (dep) {
      res.json({ message: 'OK', deletedDepartment: dep });
    } else res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
