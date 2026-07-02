import axios from "axios";

// Central place to configure the base URL for the backend API.
const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Member-related API calls ---

export const getMembers = () => api.get("/api/members/");

export const getMember = (id) => api.get(`/api/members/${id}`);

export const createMember = (member) => api.post("/api/members/", member);

export const updateMember = (id, member) => api.put(`/api/members/${id}`, member);

export const deleteMember = (id) => api.delete(`/api/members/${id}`);

export default api;
