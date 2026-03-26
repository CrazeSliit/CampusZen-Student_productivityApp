import React, { useEffect, useState } from "react";
import "./ResourceSharing.css";
import { getResources, uploadResource, deleteResource } from "../services/studyAPI";

function ResourceSharing() {
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({ title: "", fileUrl: "", fileType: "" });

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const { data } = await getResources();
      setResources(data);
    } catch (err) {
      console.error("Error fetching resources", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await uploadResource(form);
      setForm({ title: "", fileUrl: "", fileType: "" });
      fetchAll();
    } catch (err) {
      console.error("Error uploading resource", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteResource(id);
      fetchAll();
    } catch (err) {
      console.error("Error deleting resource", err);
    }
  };

  return (
    <div className="resource-container">
      <h2>Resource Sharing</h2>

      <form className="resource-form" onSubmit={handleUpload}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="File URL"
          value={form.fileUrl}
          onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
          required
        />
        <input
          placeholder="File Type (pdf, doc...)"
          value={form.fileType}
          onChange={(e) => setForm({ ...form, fileType: e.target.value })}
        />
        <button type="submit">Share Resource</button>
      </form>

      <div className="resource-list">
        {resources.map((r) => (
          <div key={r._id} className="resource-card">
            <div>
              <p>{r.title}</p>
              <a href={r.fileUrl} target="_blank" rel="noreferrer">Open file</a>
              {r.fileType && <span className="file-type-badge">{r.fileType}</span>}
            </div>
            <button className="btn-delete" onClick={() => handleDelete(r._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourceSharing;