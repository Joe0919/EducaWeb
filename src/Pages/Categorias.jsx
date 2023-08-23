import { styled } from "styled-components";

import { Modal } from "../Components/Modal";
import { Btn, MainPadding, Titulo1 } from "../Components/UI";
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
import { buscar, registrar } from "../Api/api";
import { mostrarMensaje } from "../functions";

export default () => {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // const [nombre, setNombre] = useState("");
  // const [descripcion, setDescripcion] = useState("");
  // const [color, setColor] = useState("#000");
  // const [codigo, setCodigo] = useState("");

  const [datosForm, setDatosForm] = useState({
    nombre: "",
    descripcion: "",
    color: "#000",
    codigo: "",
    // Agrega aquí más campos de entrada si es necesario
  });
  const manejarCambios = (event) => {
    setDatosForm({
      ...datosForm,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    buscar("/categorias", setData, setLoading);
  }, [data]); //Consultar datos de la API

  // useEffect(() => {
  //   console.log(color)
  // }, [color]);

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
        Cell: (row) => (
          <button onClick={() => handleButtonClick(row)}>Editar</button>
        ),
      },
      {
        Header: "Eliminar",
      },
    ],
    []
  );

  const handleButtonClick = (row) => {
    // Lógica para manejar el clic en el botón
    console.log(row.row.original.id);
  };

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
    return <div>Cargando...</div>;
  }

  const Enviar = (evt) => {
    evt.preventDefault();
    let id = uuidv4();
    const data = {
      ...datosForm,
      id,
    };
    registrar("/categorias", data, setLoading);
    setActive(!active)
    mostrarMensaje("Se registraron los datos", "success")
  };

  return (
    data.length > 0 && (
      <MainPadding>
        <Titulo1>NUEVA CATEGORIA</Titulo1>
        <Btn onClick={() => setActive(!active)}>Nuevo</Btn>
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
            <form onSubmit={Enviar}>
              <TextField
                id="nombre"
                name="nombre"
                label="Nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={datosForm.nombre}
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
                value={datosForm.descripcion}
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
                value={datosForm.color}
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
                value={datosForm.codigo}
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
                  Guardar
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

const ContenedorBotones = styled.div`
  width: 100%;
  margin: 1rem 0 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ContenedorPag = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

// const Boton = styled.button`
//   display: block;
//   padding: 10px 30px;
//   border-radius: 50px;
//   color: #fff;
//   border: none;
//   background: #1766dc;
//   cursor: pointer;
//   font-family: "Roboto", sans-serif;
//   font-weight: 500;
//   transition: 0.3s ease all;

//   &:hover {
//     background: #0066ff;
//   }
// `;

const Contenido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;

  h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  img {
    width: 100%;
    vertical-align: top;
    border-radius: 3px;
  }
`;

const Paginacion = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const BotonPag = styled.button`
  padding: 0.5rem;
  border: 2px solid white;
  font-weight: 600;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2a7ae4;
  &:disabled {
    color: gray;
  }
`;
