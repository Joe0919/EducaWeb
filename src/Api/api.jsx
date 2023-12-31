import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:5001",
// });
export const api = axios.create({
  baseURL: "https://64da4fdde947d30a260b1eb5.mockapi.io",
});

export const buscar = async (url, setData, setLoading, setMainLoad) => {
  try {
    await api.get(url).then((response) => {
      setData(response.data);
      setLoading(false);
      setMainLoad(false);
    });
  } catch (error) {
    if (error.response && error.response.status === 429) {
      // Si el error es 429 (demasiadas solicitudes), esperar 1 segundo y volver a intentar
      await new Promise((resolve) => setTimeout(resolve, 600));
      return buscar(url, setData, setLoading); // Volver a llamar a la función buscar
    } else {
      console.error(error);
      setMainLoad(true);
    }
  }
};

export const registrar = (url, data, setData, setLoading, setMainLoad) => {
  // console.log(api.defaults.baseURL + url);
  // console.log(data);
  api
    .post(url, data)
    .then((response) => {
      console.log("Datos registrados:", response.data);
      buscar(url, setData, setLoading, setMainLoad);
    })
    .catch((error) => {
      console.error("Error al registrar los datos:", error);
      console.error(error.response.status);
    });
};

export const editar = (url, url1, data, setData, setLoading, setMainLoad) => {
  api
    .put(url, data)
    .then((response) => {
      console.log("Datos editados:", response.data);
      buscar(url1, setData, setLoading, setMainLoad);
      // Realizar cualquier otra acción después de editar los datos
    })
    .catch((error) => {
      console.error("Error al editar los datos:", error);
      console.error(error.response.status);
      // Manejar el error de alguna manera
    });
};

export const eliminar = async (url, url1, setData, setLoading, setMainLoad) => {
  try {
    const response = await api.delete(url);
    console.log("Registro eliminado:", response.data);
    buscar(url1, setData, setLoading, setMainLoad);
  } catch (error) {
    console.error("Error al eliminar el registro:", error);
    console.error(error.response.status);
  }
};
