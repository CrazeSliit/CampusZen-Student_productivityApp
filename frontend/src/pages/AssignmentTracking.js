import React, { useEffect, useState } from "react";
import "./AssignmentTracking.css";
import {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "../services/studyAPI";

function AssignmentTracking() {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const { data } = await getAssignments();
      setAssignments(data);
    } catch (err) {
      console.error("Error fetching assignments", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createAssignment(form);
      setForm({ title: "", description: "", dueDate: "" });
      fetchAll();
    } catch (err) {
      console.error("Error creating assignment", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateAssignment(id, { status });
      fetchAll();
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAssignment(id);
      fetchAll();
    } catch (err) {
      console.error("Error deleting assignment", err);
    }
  };

  const getStatusClass = (status) => {
    if (status === "pending") return "status-badge status-pending";
    if (status === "in-progress") return "status-badge status-in-progress";
    return "status-badge status-completed";
  };

  return (
    <div className="assignment-container">
      <h2>Assignment Tracker</h2>

      <form className="assignment-form" onSubmit={handleCreate}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          required
        />
        <button type="submit">Add Assignment</button>
      </form>

      <div className="assignment-list">
        {assignments.map((a) => (
          <div key={a._id} className="assignment-card">
            <div>
              <p>{a.title}</p>
              <span>Due: {new Date(a.dueDate).toLocaleDateString()}</span>
              <span className={getStatusClass(a.status)}>{a.status}</span>
            </div>
            <div className="assignment-actions">
              <select
                value={a.status}
                onChange={(e) => handleStatusChange(a._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button className="btn-delete" onClick={() => handleDelete(a._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssignmentTracking;