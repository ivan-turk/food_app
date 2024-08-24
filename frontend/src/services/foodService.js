import axios from "axios";

export const getAll = async () => {
  const { data } = await axios.get("/api/foods/");
  return data;
};

export const search = async (searchTerm) => {
  const { data } = await axios.get("/api/foods/search/" + searchTerm);
  return data;
};

//Asinkrona funkcija za sve 'tagove':

export const getAllTags = async () => {
  const { data } = await axios.get("/api/foods/tags/");
  return data;
};

export const getAllByTag = async (tag) => {
  if (tag === "Sve") return getAll();
  const { data } = await axios.get("/api/foods/tag/" + tag);
  return data;
};

export const getById = async (foodId) => {
  const { data } = await axios.get("/api/foods/" + foodId);
  return data;
};
