import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
});

// INVENTORY ROUTES

export const getAllInventory = (params) =>
  API.get("/inventory", { params });

export const getInventoryById = (id) =>
  API.get(`/inventory/${id}`);

export const getDeletedInventory = () =>
  API.get("/inventory/deleted");

export const createInventory = (data) =>
  API.post("/inventory", data);

export const updateInventory = (id, data) =>
  API.patch(`/inventory/${id}`, data);

export const deleteInventory = (id) =>
  API.delete(`/inventory/${id}`);

export const recoverInventory = (id) =>
  API.patch(`/inventory/${id}/recover`);
