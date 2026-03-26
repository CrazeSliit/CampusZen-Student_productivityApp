const mongoose = require("mongoose");

// 1. Study Group
const studyGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  module: { type: String, required: true },
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

// 2. Resource
const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileType: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  studyGroup: { type: mongoose.Schema.Types.ObjectId, ref: "StudyGroup" },
}, { timestamps: true });

// 3. Assignment
const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

// 4. Timetable
const timetableSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  day: { type: String, enum: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], required: true },
  subject: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
}, { timestamps: true });

module.exports = {
  StudyGroup: mongoose.model("StudyGroup", studyGroupSchema),
  Resource: mongoose.model("Resource", resourceSchema),
  Assignment: mongoose.model("Assignment", assignmentSchema),
  Timetable: mongoose.model("Timetable", timetableSchema),
};