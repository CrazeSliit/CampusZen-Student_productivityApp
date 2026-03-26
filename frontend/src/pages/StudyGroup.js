import React, { useEffect, useState } from "react";
import "./StudyGroup.css";
import { getGroups, createGroup, joinGroup, deleteGroup } from "../services/studyAPI";

function StudyGroup() {
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState({ name: "", module: "", description: "" });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const { data } = await getGroups();
      setGroups(data);
    } catch (err) {
      console.error("Error fetching groups", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createGroup(form);
      setForm({ name: "", module: "", description: "" });
      fetchGroups();
    } catch (err) {
      console.error("Error creating group", err);
    }
  };

  const handleJoin = async (id) => {
    try {
      await joinGroup(id);
      fetchGroups();
    } catch (err) {
      console.error("Error joining group", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGroup(id);
      fetchGroups();
    } catch (err) {
      console.error("Error deleting group", err);
    }
  };

  return (
    <div className="study-group-container">
      <h2>Study Groups</h2>

      <form className="study-form" onSubmit={handleCreate}>
        <input
          placeholder="Group Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Module"
          value={form.module}
          onChange={(e) => setForm({ ...form, module: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">Create Group</button>
      </form>

      <div className="group-list">
        {groups.map((g) => (
          <div key={g._id} className="group-card">
            <div>
              <p>{g.name}</p>
              <span>{g.module} — {g.members.length} members</span>
            </div>
            <div className="group-actions">
              <button className="btn-join" onClick={() => handleJoin(g._id)}>Join</button>
              <button className="btn-delete" onClick={() => handleDelete(g._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyGroup;