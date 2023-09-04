import { Modal } from "../Components/Modal";
import {
  BotonDelete,
  BotonEdit,
  BotonNew,
  BotonPag,
  BotonTransparent,
  Carga,
  ContenedorBotones,
  ContenedorPag,
  Contenido,
  ContentBtn,
  Loader,
  MainPadding,
  Paginacion,
  Titulo1,
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
import { Button, TextField } from "@mui/material";
import { buscar, editar, eliminar, registrar } from "../Api/api";
import { mostrarMensaje } from "../functions";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default ({ setMainLoad }) => {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [btnContenido, setBtnContenido] = useState("Guardar");

  const [datosForm, setDatosForm] = useState({
    nombre: "",
    descripcion: "",
    color: "#f00",
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
    buscar("/categorias", setData, setLoading, setMainLoad);
  }, [setMainLoad]); //Consultar datos de la API

  // + < CONFIGURANDO LA TABLA >
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Descripción",
        accessor: "descripcion",
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
                  `/categorias/${id}`,
                  "/categorias",
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
    [active, setData, setMainLoad]
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
      text: "¡No podrás revertir la eliminación!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        let id = uuidv4();
        const data = {
          ...datosForm,
          id,
        };
        registrar("/categorias", data, setData, setLoading, setMainLoad);
        setActive(!active);
        mostrarMensaje("Se registraron los datos", "success");
      }
    });
    // Realizar alguna acción con los datos ingresados
  };
  const EditarDatos = (evt) => {
    evt.preventDefault();
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
        const id = datosForm.id;
        editar(
          `/categorias/${id}`,
          `/categorias`,
          datosForm,
          setData,
          setLoading,
          setMainLoad
        );
        setActive(!active);
        mostrarMensaje("Se Editaron los datos", "success");
      }
    });
  };

  return (
    data.length > 0 && (
      <MainPadding>
        <Titulo1>CATEGORIAS REGISTRADAS</Titulo1>
        <ContentBtn>
          <Link to={`/videos`} title="Ir a Inicio">
            <BotonTransparent>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-arrow-left-square-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
              </svg>{" "}
              Videos
            </BotonTransparent>
          </Link>
          <BotonNew
            onClick={() => {
              setActive(!active);
              setDatosForm({
                nombre: "",
                descripcion: "",
                color: "#f00",
                codigo: "",
              });
              setBtnContenido("Guardar");
            }}
          >
            NUEVO
          </BotonNew>
        </ContentBtn>
        <Modal
          estado={active}
          cambiarEstado={setActive}
          titulo="GESTIÓN DE CATEGORIAS"
          mostrarHeader={true}
          mostrarOverlay={true}
          posicionModal={"start"}
          padding={"20px"}
          width={"600px"}
        >
          <Contenido>
            <form onSubmit={btnContenido === "Guardar" ? Enviar : EditarDatos}>
              <TextField
                id="nombre"
                name="nombre"
                label="Nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={datosForm?.nombre || ""}
                onChange={manejarCambios}
              />
              <TextField
                id="descripcion"
                name="descripcion"
                label="Descripcion"
                variant="outlined"
                fullWidth
                margin="normal"
                rows={3}
                required
                value={datosForm?.descripcion || ""}
                onChange={manejarCambios}
              />
              <TextField
                id="color"
                name="color"
                label="Color"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={datosForm?.color || ""}
                onChange={manejarCambios}
                type="color"
              />
              <TextField
                id="codigo"
                name="codigo"
                label="Código de Seguridad"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={datosForm?.codigo || ""}
                onChange={manejarCambios}
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
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        {/* Añadimos las propiedades a nuestra tabla nativa */}

        <div>
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
              <BotonPag onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
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
              <BotonPag onClick={() => nextPage()} disabled={!canNextPage}>
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
