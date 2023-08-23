import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5001",
});
// export const api = axios.create({
//   baseURL: "https://64da4fdde947d30a260b1eb5.mockapi.io",
// });

export const buscar = async (url, setData, setLoading) => {
  await api
    .get(url)
    .then((response) => {
      setData(response.data);
      setLoading(false);
    })
    .catch((error) => console.error(error));
};

export const registrar = (url, data, setLoading) => {
  api
    .post(url, data)
    .then((response) => {
      console.log("Datos registrados:", response.data);
      setLoading(false);
      // Realizar cualquier otra acción después de registrar los datos
    })
    .catch((error) => {
      console.error("Error al registrar los datos:", error);
      // Manejar el error de alguna manera
    });
};
