import axios from "axios";

export const POST = async (url, data = {}) => {
  const token = localStorage.getItem("token");
  const response = await axios({
    url,
    method: "POST",
    headers: {
      Authorization: token ? "Bearer " + token : null,
    },
    data,
  });
  return response.data;
};
export const GET = async (url, data = {}) => {
  const token = localStorage.getItem("token");
  const response = await axios({
    url,
    method: "GET",
    headers: {
      Authorization: token ? "Bearer " + token : null,
    },
    data,
  });
  return response.data;
};
export const PUT = async (url, id, data = {}) => {
  const token = localStorage.getItem("token");
  const response = await axios({
    url: url + `/${id}`,
    method: "PUT",
    headers: {
      Authorization: token ? "Bearer " + token : null,
    },
    data,
  });
  return response.data;
};
export const DELETE = async (url, id) => {
  const token = localStorage.getItem("token");
  const response = await axios({
    url: url + `/${id}`,
    method: "DELETE",
    headers: {
      Authorization: token ? "Bearer " + token : null,
    },
  });
  return response.data;
};
