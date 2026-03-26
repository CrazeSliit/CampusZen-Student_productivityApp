const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware"); // your existing auth middleware
const {
  createGroup, getAllGroups, joinGroup, deleteGroup,
  uploadResource, getResources, deleteResource,
  createAssignment, getAssignments, updateAssignment, deleteAssignment,
  addTimetableEntry, getTimetable, updateTimetableEntry, deleteTimetableEntry,
} = require("../controllers/studyController");

// Study Groups
router.post("/groups", protect, createGroup);
router.get("/groups", protect, getAllGroups);
router.put("/groups/:id/join", protect, joinGroup);
router.delete("/groups/:id", protect, deleteGroup);

// Resources
router.post("/resources", protect, uploadResource);
router.get("/resources", protect, getResources);
router.delete("/resources/:id", protect, deleteResource);

// Assignments
router.post("/assignments", protect, createAssignment);
router.get("/assignments", protect, getAssignments);
router.put("/assignments/:id", protect, updateAssignment);
router.delete("/assignments/:id", protect, deleteAssignment);

// Timetable
router.post("/timetable", protect, addTimetableEntry);
router.get("/timetable", protect, getTimetable);
router.put("/timetable/:id", protect, updateTimetableEntry);
router.delete("/timetable/:id", protect, deleteTimetableEntry);

module.exports = router;
