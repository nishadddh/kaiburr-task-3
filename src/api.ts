import axios from "axios";

const API_BASE = "http://localhost:30080";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export const getTasks = () => api.get("/tasks");
export const createTask = (task: any) => api.post("/tasks", task);
export const deleteTask = (id: number) => api.delete(`/tasks/${id}`);
export const runCommand = (id: number) => api.post(`/tasks/${id}/run`);
