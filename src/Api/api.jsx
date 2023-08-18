import axios from "axios";

export const api = axios.create({
  baseURL: "https://64da4fdde947d30a260b1eb5.mockapi.io",
});

export const buscar = async (url, setData) => {
  await api
    .get(url)
    .then((response) => setData(response.data))
    .catch((error) => console.error(error));
};
