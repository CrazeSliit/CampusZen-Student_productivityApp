const { StudyGroup, Resource, Assignment, Timetable } = require("../models/studyModel");

// ── Study Groups ──────────────────────────────────────────
exports.createGroup = async (req, res) => {
  try {
    const group = await StudyGroup.create({ ...req.body, createdBy: req.user._id, members: [req.user._id] });
    res.status(201).json(group);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await StudyGroup.find().populate("createdBy", "name email");
    res.json(groups);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.joinGroup = async (req, res) => {
  try {
    const group = await StudyGroup.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    if (!group.members.includes(req.user._id)) {
      group.members.push(req.user._id);
      await group.save();
    }
    res.json(group);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteGroup = async (req, res) => {
  try {
    await StudyGroup.findByIdAndDelete(req.params.id);
    res.json({ message: "Group deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── Resources ─────────────────────────────────────────────
exports.uploadResource = async (req, res) => {
  try {
    const resource = await Resource.create({ ...req.body, uploadedBy: req.user._id });
    res.status(201).json(resource);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate("uploadedBy", "name");
    res.json(resources);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteResource = async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: "Resource deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── Assignments ───────────────────────────────────────────
exports.createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create({ ...req.body, student: req.user._id });
    res.status(201).json(assignment);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ student: req.user._id });
    res.json(assignments);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateAssignment = async (req, res) => {
  try {
    const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assignment deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── Timetable ─────────────────────────────────────────────
exports.addTimetableEntry = async (req, res) => {
  try {
    const entry = await Timetable.create({ ...req.body, student: req.user._id });
    res.status(201).json(entry);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getTimetable = async (req, res) => {
  try {
    const entries = await Timetable.find({ student: req.user._id });
    res.json(entries);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateTimetableEntry = async (req, res) => {
  try {
    const updated = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteTimetableEntry = async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
