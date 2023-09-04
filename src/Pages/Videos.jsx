import { Modal } from "../Components/Modal";
import {
  BotonDelete,
  BotonEdit,
  BotonNew,
  BotonPag,
  BotonView,
  Carga,
  ContenedorBotones,
  ContenedorPag,
  Contenido,
  ContentBtn,
  DivError,
  Loader,
  MainPadding,
  Paginacion,
  Titulo1,
  Video,
  VideoPlayer,
} from "../Components/UI";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  useGlobalFilter,
  useSortBy,
  useTable,
  usePagination,
} from "react-table";

import GlobalFilter from "../GlobalFilter";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { buscar, editar, eliminar, registrar } from "../Api/api";
import { mostrarMensaje, validarURL } from "../functions";
import Swal from "sweetalert2";

export default ({ setMainLoad }) => {
  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]); // Hook que guarda los videos
  const [categorias, setCategorias] = useState([]);

  const [btnContenido, setBtnContenido] = useState("Guardar");

  const [errors, setErrors] = useState({
    //Hook que maneja los estados
    titulo: {
      error: false,
      message: "No debe estar vacio",
    },
    link: {
      error: false,
      message: "No debe estar vacio",
    },
    imagen: {
      error: false,
      message: "No debe estar vacio",
    },
    codigo: {
      error: false,
      message: "No debe estar vacio",
    },
  });

  const handleVideoError = () => {
    setError(true);
  };

  const [datosForm, setDatosForm] = useState({
    titulo: "",
    link: "",
    imagen: "",
    categoria: "",
    descripcion: "",
    codigo: "",
  });
  const manejarCambios = (event) => {
    const { name, value } = event.target;
    setDatosForm({
      ...datosForm,
      [name]: value,
    });
  };

  useEffect(() => {
    buscar("/videos", setData, setLoading, setMainLoad);
    buscar("/categorias", setCategorias, setLoading, setMainLoad);
  }, [setMainLoad]); //Consultar datos de la API

  // + < CONFIGURANDO LA TABLA >
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Titulo",
        accessor: "titulo",
      },
      {
        Header: "Descripción",
        accessor: "descripcion",
      },
      {
        Header: "Categoria",
        accessor: "categoria",
      },
      {
        Header: "Ver",
        Cell: (row) => {
          const Ver = () => {
            setDatosForm(row.row.original);
            setActive1(!active1);
          };
          return (
            <BotonView onClick={Ver}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye-fill"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
            </BotonView>
          );
        },
      },
      {
        Header: "Editar",
        Cell: (row) => {
          const Editar = () => {
            setDatosForm(row.row.original);
            setBtnContenido("Editar");
            setActive(!active);
          };

          return (
            <BotonEdit onClick={Editar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-pencil-fill"
                viewBox="0 0 16 16"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
            </BotonEdit>
          );
        },
      },
      {
        Header: "Eliminar",
        Cell: (row) => {
          const Eliminar = () => {
            Swal.fire({
              title: "¿Estás seguro?",
              text: "¡No podrás revertir la eliminación!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Confirmar",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                const id = row.row.original.id;
                eliminar(
                  `/videos/${id}`,
                  "/videos",
                  setData,
                  setLoading,
                  setMainLoad
                );
                mostrarMensaje("Se eliminó el registro", "success");
              }
            });
          };

          return (
            <BotonDelete onClick={Eliminar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
              </svg>
            </BotonDelete>
          );
        },
      },
    ],
    [active, setData, active1, setMainLoad]
  );

  // + INICIALIZACION DE LA TABLA

  const table = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = table;

  const { globalFilter, pageIndex, pageSize } = state;
  // + </ CONFIGURANDO LA TABLA >

  if (loading) {
    return (
      <Carga>
        <Loader />
      </Carga>
    );
  }

  const Enviar = (evt) => {
    evt.preventDefault();
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Se registraran los datos ingresados!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const { link, imagen, codigo } = datosForm;
        let campoRepetido = "";

        const registroExistente = data.find((registro) => {
          registro.link === link
            ? (campoRepetido = "Link de video")
            : registro.imagen === imagen
            ? (campoRepetido = "Link de Imagen")
            : registro.codigo === codigo
            ? (campoRepetido = "Codigo")
            : (campoRepetido = "");

          return campoRepetido !== "";
        });

        if (!registroExistente) {
          if (validarURL(link)) {
            let id = uuidv4();
            const newData = {
              ...datosForm,
              id,
            };
            registrar("/videos", newData, setData, setLoading, setMainLoad);
            setActive(!active);
            mostrarMensaje("Se registraron los datos", "success");
          } else {
            mostrarMensaje(
              "Ingrese un link de video adecuado (Youtube)",
              "error"
            );
          }
        } else {
          mostrarMensaje(
            `No se puede registrar porque ya hay un registro con igual: ${campoRepetido}.`,
            "error"
          );
        }
      }
    });
  };

  const EditarDatos = (evt) => {
    evt.preventDefault();
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡El registro se editará con los datos ingresados!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const { id, link, imagen, codigo } = datosForm;
        let campoRepetido = "";

        const registroExistente = data.find((registro) => {
          if (registro.id !== id) {
            registro.link === link
              ? ((campoRepetido = "Link de video"), true)
              : registro.imagen === imagen
              ? ((campoRepetido = "Link de Imagen"), true)
              : registro.codigo === codigo
              ? ((campoRepetido = "Codigo"), true)
              : (campoRepetido = "");
          }

          return campoRepetido !== "";
        });

        if (!registroExistente) {
          if (validarURL(link)) {
            editar(
              `/videos/${id}`,
              `/videos`,
              datosForm,
              setData,
              setLoading,
              setMainLoad
            );
            setActive(!active);
            mostrarMensaje("Se Editaron los datos", "success");
          } else {
            mostrarMensaje(
              "Ingrese un link de video adecuado (Youtube)",
              "error"
            );
          }
        } else {
          mostrarMensaje(
            `No se puede registrar porque ya hay un registro con campo ${campoRepetido} igual.`,
            "error"
          );
        }
      }
    });
  };

  return (
    data.length > 0 && (
      <MainPadding>
        <Titulo1>VIDEOS REGISTRADOS</Titulo1>
        <ContentBtn>
          <BotonNew
            onClick={() => {
              setActive(!active);
              setDatosForm({
                titulo: "",
                link: "",
                imagen: "",
                categoria: "",
                descripcion: "",
                codigo: "",
              });
              setBtnContenido("Guardar");
            }}
          >
            NUEVO REGISTRO
          </BotonNew>
        </ContentBtn>
        <Modal
          estado={active}
          cambiarEstado={setActive}
          titulo="GESTIÓN DE VIDEOS"
          mostrarHeader={true}
          mostrarOverlay={true}
          posicionModal={"start"}
          padding={"20px"}
          width={"600px"}
        >
          <Contenido>
            <form onSubmit={btnContenido === "Guardar" ? Enviar : EditarDatos}>
              <TextField
                id="titulo"
                name="titulo"
                label="Titulo"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={datosForm?.titulo || ""}
                onChange={manejarCambios}
                error={errors.titulo.error}
                helperText={errors.titulo.error ? errors.titulo.message : ""}
              />
              <TextField
                id="link"
                name="link"
                label="Link del Video"
                variant="outlined"
                fullWidth
                margin="normal"
                rows={3}
                required
                value={datosForm?.link || ""}
                onChange={manejarCambios}
                error={errors.link.error}
                helperText={errors.link.error ? errors.link.message : ""}
              />
              <TextField
                id="imagen"
                name="imagen"
                label="Link de la imagen"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={datosForm?.imagen || ""}
                onChange={manejarCambios}
                error={errors.imagen.error}
                helperText={errors.imagen.error ? errors.imagen.message : ""}
              />
              <TextField
                id="descripcion"
                name="descripcion"
                label="Descripción"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={datosForm?.descripcion || ""}
                onChange={manejarCambios}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Categoría *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="categoria"
                  label="Categoría"
                  required
                  value={datosForm?.categoria || ""}
                  onChange={manejarCambios}
                >
                  {categorias.map((item) => (
                    <MenuItem key={item.nombre} value={item.nombre}>
                      {item.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="codigo"
                name="codigo"
                label="Código"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={datosForm?.codigo || ""}
                onChange={manejarCambios}
                error={errors.codigo.error}
                helperText={errors.codigo.error ? errors.codigo.message : ""}
              />
              <ContenedorBotones>
                <Button
                  variant="contained"
                  onClick={() => setActive(!active)}
                  color="error"
                >
                  Cerrar
                </Button>

                <Button type="submit" variant="contained">
                  {btnContenido}
                </Button>

                {/* <Boton onClick={() => setActive(!active)}>Cerrar</Boton>
                  <Boton>Guardar</Boton> */}
              </ContenedorBotones>
            </form>
          </Contenido>
        </Modal>
        <Modal
          estado={active1}
          cambiarEstado={setActive1}
          mostrarHeader={false}
          mostrarOverlay={true}
          posicionModal={"start"}
          padding={"0"}
          width={"100vw"}
          paddingOverlay={"0px"}
          colorFondo={"transparent"}
          tipoModal={"ModalVideo"}
          tituloVideo={datosForm?.titulo || ""}
          categoriaVideo={datosForm?.categoria || ""}
        >
          <Contenido>
            <Video>
              {error ? (
                <DivError>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      fill="currentColor"
                      className="bi bi-camera-video-off"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.961 12.365a1.99 1.99 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l.714 1H9.5a1 1 0 0 1 1 1v6a1 1 0 0 1-.144.518l.605.847zM1.428 4.18A.999.999 0 0 0 1 5v6a1 1 0 0 0 1 1h5.014l.714 1H2a2 2 0 0 1-2-2V5c0-.675.334-1.272.847-1.634l.58.814zM15 11.73l-3.5-1.555v-4.35L15 4.269v7.462zm-4.407 3.56-10-14 .814-.58 10 14-.814.58z"
                      />
                    </svg>
                  </div>
                  <div>
                    No se pudo cargar el video. El enlace es incorrecto. Pruebe
                    cambiando el link del video.
                  </div>
                </DivError>
              ) : (
                <VideoPlayer
                  url={datosForm?.link || ""}
                  controls
                  width="100%"
                  height="100%"
                  onError={handleVideoError}
                ></VideoPlayer>
              )}
            </Video>
          </Contenido>
        </Modal>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        {/* Añadimos las propiedades a nuestra tabla nativa */}
        <div className="content-tabla">
          <table {...getTableProps()} className="tabla">
            <thead>
              {
                // Recorremos las columnas que previamente definimos
                headerGroups.map((headerGroup, index) => (
                  // Añadimos las propiedades al conjunto de columnas
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {
                      // Recorremos cada columna del conjunto para acceder a su información
                      headerGroup.headers.map((column, index) => (
                        // Añadimos las propiedades a cada celda de la cabecera
                        // <th {...column.getHeaderProps()} key={index}>
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          key={index}
                        >
                          {
                            // Pintamos el título de nuestra columna (propiedad "Header")
                            column.render("Header")
                          }
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? "🔽"
                                : "🔼"
                              : ""}
                          </span>
                        </th>
                      ))
                    }
                  </tr>
                ))
              }
            </thead>
            {/* Añadimos las propiedades al cuerpo de la tabla */}
            <tbody {...getTableBodyProps()}>
              {
                // Recorremos las filas
                page.map((row, i) => {
                  // Llamamos a la función que prepara la fila previo renderizado
                  prepareRow(row);
                  return (
                    // Añadimos las propiedades a la fila
                    <tr {...row.getRowProps()} key={i}>
                      {
                        // Recorremos cada celda de la fila
                        row.cells.map((cell, i) => {
                          // Añadimos las propiedades a cada celda de la fila
                          return (
                            <td {...cell.getCellProps()} key={i}>
                              {
                                // Pintamos el contenido de la celda
                                cell.render("Cell")
                              }
                            </td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
          <Paginacion>
            <span>
              Página&nbsp;
              <strong>
                {pageIndex + 1} de {pageOptions.length}
              </strong>
            </span>
            <ContenedorPag>
              <BotonPag
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
                title="Primera Pág."
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-double-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              </BotonPag>
              <BotonPag
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                title="Anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              </BotonPag>
              <BotonPag
                onClick={() => nextPage()}
                disabled={!canNextPage}
                title="Siguiente"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </BotonPag>
              <BotonPag
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                title="Última Pág."
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-double-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </BotonPag>
            </ContenedorPag>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 15].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize !== 15 ? `Mostrar ${pageSize}` : `Mostrar Todo`}
                </option>
              ))}
            </select>
          </Paginacion>
        </div>
      </MainPadding>
    )
  );
};
