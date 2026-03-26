import axios from "axios";

const BASE = "http://localhost:5000/api/study";

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getGroups = () => axios.get(`${BASE}/groups`, getHeaders());
export const createGroup = (data) => axios.post(`${BASE}/groups`, data, getHeaders());
export const joinGroup = (id) => axios.put(`${BASE}/groups/${id}/join`, {}, getHeaders());
export const deleteGroup = (id) => axios.delete(`${BASE}/groups/${id}`, getHeaders());

export const getResources = () => axios.get(`${BASE}/resources`, getHeaders());
export const uploadResource = (data) => axios.post(`${BASE}/resources`, data, getHeaders());
export const deleteResource = (id) => axios.delete(`${BASE}/resources/${id}`, getHeaders());

export const getAssignments = () => axios.get(`${BASE}/assignments`, getHeaders());
export const createAssignment = (data) => axios.post(`${BASE}/assignments`, data, getHeaders());
export const updateAssignment = (id, data) => axios.put(`${BASE}/assignments/${id}`, data, getHeaders());
export const deleteAssignment = (id) => axios.delete(`${BASE}/assignments/${id}`, getHeaders());

export const getTimetable = () => axios.get(`${BASE}/timetable`, getHeaders());
export const addTimetableEntry = (data) => axios.post(`${BASE}/timetable`, data, getHeaders());
export const updateTimetableEntry = (id, data) => axios.put(`${BASE}/timetable/${id}`, data, getHeaders());
export const deleteTimetableEntry = (id) => axios.delete(`${BASE}/timetable/${id}`, getHeaders());