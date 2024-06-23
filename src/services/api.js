import axios from "axios";
const url = "http://localhost:3001/properties";
export const getallProperties = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`);
};
export const editProperty = async (id, prop) => {
  return await axios.put(`${url}/${id}`, prop);
};

