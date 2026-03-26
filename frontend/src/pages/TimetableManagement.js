import React, { useEffect, useState } from "react";
import "./TimetableManagement.css";
import { getTimetable, addTimetableEntry, deleteTimetableEntry } from "../services/studyAPI";

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

function TimetableManagement() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ day: "Monday", subject: "", startTime: "", endTime: "" });

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const { data } = await getTimetable();
      setEntries(data);
    } catch (err) {
      console.error("Error fetching timetable", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addTimetableEntry(form);
      setForm({ day: "Monday", subject: "", startTime: "", endTime: "" });
      fetchAll();
    } catch (err) {
      console.error("Error adding entry", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTimetableEntry(id);
      fetchAll();
    } catch (err) {
      console.error("Error deleting entry", err);
    }
  };

  return (
    <div className="timetable-container">
      <h2>Weekly Timetable</h2>

      <form className="timetable-form" onSubmit={handleAdd}>
        <select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}>
          {DAYS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        />
        <input
          type="time"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          required
        />
        <input
          type="time"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          required
        />
        <button type="submit">Add Entry</button>
      </form>

      {DAYS.map((day) => {
        const dayEntries = entries.filter((e) => e.day === day);
        if (!dayEntries.length) return null;
        return (
          <div key={day} className="day-section">
            <h3>{day}</h3>
            {dayEntries.map((e) => (
              <div key={e._id} className="timetable-card">
                <span>{e.subject} — {e.startTime} to {e.endTime}</span>
                <button className="btn-remove" onClick={() => handleDelete(e._id)}>Remove</button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default TimetableManagement;