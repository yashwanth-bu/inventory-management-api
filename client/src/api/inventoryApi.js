import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/inventory"
});

// GET all 
export const getAllInventory = (params) =>
  API.get("/", { params });

// GET by id
export const getInventoryById = (id) => API.get(`/${id}`);

// GET deleted
export const getDeletedInventory = () => API.get("/deleted");

// GET by name (direct route — still usable if needed)
export const getInventoryByName = (name) =>
  API.get(`/by-name/${name}`);

// CREATE
export const createInventory = (data) =>
  API.post("/", data);

// UPDATE
export const updateInventory = (id, data) =>
  API.patch(`/${id}`, data);

// DELETE
export const deleteInventory = (id) =>
  API.delete(`/${id}`);

// RECOVER
export const recoverInventory = (id) =>
  API.patch(`/${id}/recover`);
