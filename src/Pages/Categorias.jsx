import { styled } from "styled-components";
import { Modal } from "../Components/Modal";
import { Btn, MainPadding, Titulo1 } from "../Components/UI";
import {  useMemo, useState } from "react";
import { buscar } from "../Api/api";

import {
  useGlobalFilter,
  useSortBy,
  useTable,
  usePagination,
} from "react-table";
import GlobalFilter from "../GlobalFilter";

export default () => {
  const [active, setActive] = useState(false);
  const [categorias, setCategorias] = useState([]);

  useMemo(() => {
    buscar(`/categorias`, setCategorias);
  }, []);

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
        accessor: "editar",
      },
      {
        Header: "Eliminar",
        accessor: "eliminar",
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        nombre: "Front End",
        descripcion:
          "Todos los video que estoy usando para estudiar Front End.",
        color: "#6BD1FF",
        cod: "Front End",
        id: "1",
      },
      {
        nombre: "Back End",
        descripcion: "Todos los video que estoy usando para estudiar Back End.",
        color: "#00C86F",
        cod: "Back End",
        id: "2",
      },
      {
        nombre: "Data Science",
        descripcion: "Cosas de React y Python que vengo aprendiendo.",
        color: "#FE8C2A",
        cod: "Data Science",
        id: "5",
      },
      {
        nombre: "Design & UX",
        descripcion: "Herramientas y técnicas que estudio sobre UX y Design.",
        color: "#DC6EBE",
        cod: "Design & UX",
        id: "4",
      },
      {
        nombre: "Mobile",
        descripcion:
          "Contenido que vengo estudiando sobre React Native y Flutter",
        color: "#9CD33B",
        cod: "Mobile",
        id: "5",
      },
      {
        nombre: "Infraestructura",
        descripcion: "Todo lo que estoy aprendiendo sobre Docker y mucho mas",
        color: "#6B5BE2",
        cod: "Infraestructura",
        id: "6",
      },
      {
        nombre: "Marketing Digital",
        descripcion: "La forma de vender y monetizar mis ideas",
        color: "#FFBA05",
        cod: "Marketing Digital",
        id: "7",
      },
      {
        nombre: "Innovación y Gestión",
        descripcion: "Como mantener el equipo felíz y mucho mas",
        color: "#ff3a3a",
        cod: "Innovación y Gestión",
        id: "8",
      },
    ],
    []
  );


  const table = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 5,
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
  return (
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
      >
        <Contenido>
          <h1>Ventana Modal</h1>
          <p>Reutilizable y con opciones de personalización.</p>
          <Boton onClick={() => setActive(!active)}>Aceptar</Boton>
        </Contenido>
      </Modal>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      {/* Añadimos las propiedades a nuestra tabla nativa */}
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
                      {...column.getHeaderProps(column.getSortByToggleProps())}
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
      <div className="pagination">
        <span>
          Página
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>
        </span>
        <div className="controls">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
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
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
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
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
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
          </button>
          <button
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
          </button>
        </div>
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
      </div>
    </MainPadding>
  );
};

// const ContenedorBotones = styled.div`
//   padding: 40px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 20px;
// `;

const Boton = styled.button`
  display: block;
  padding: 10px 30px;
  border-radius: 100px;
  color: #fff;
  border: none;
  background: #1766dc;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  transition: 0.3s ease all;

  &:hover {
    background: #0066ff;
  }
`;

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