import { styled } from "styled-components";
import ReactDOM from "react-dom";
import { BotonClose } from "../UI";

export const Modal = ({
  children,
  estado,
  cambiarEstado,
  titulo = "Alerta",
  mostrarHeader,
  mostrarOverlay,
  posicionModal,
  padding,  
  paddingOverlay,
  colorFondo,
  width,
  tipoModal,
  tituloVideo,
  categoriaVideo
}) => {
  return ReactDOM.createPortal(
    <>
      {estado && (
        <Overlay
          mostrarOverlay={mostrarOverlay}
          posicionModal={posicionModal}
          paddingOverlay={paddingOverlay}
        >
          {tipoModal !== "ModalVideo" ? (
            <ContenedorModal
              padding={padding}
              width={width}
              colorFondo={colorFondo}
            >
              {mostrarHeader && (
                <EncabezadoModal>
                  <h3>{titulo}</h3>
                </EncabezadoModal>
              )}

              <BotonCerrar onClick={() => cambiarEstado(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </BotonCerrar>
              {children}
            </ContenedorModal>
          ) : (
            <ContenedorModalVideo>
              <EncabezadoModalVideo>
                <BotonClose onClick={() => cambiarEstado(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    className="bi bi-arrow-left-short"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                  </svg>
                </BotonClose>
                <ContenedorTitulos>
                  <h3>{tituloVideo}</h3>
                  <h3>{categoriaVideo}</h3>
                </ContenedorTitulos>
              </EncabezadoModalVideo>
              {children}
            </ContenedorModalVideo>
          )}
        </Overlay>
      )}
    </>,
    document.getElementById("portal")
  );
};

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: ${(props) =>
    props.mostrarOverlay ? "rgba(0,0,0,.5)" : "rgba(0,0,0,0)"};
  padding: ${(props) => (props.paddingOverlay ? props.paddingOverlay : "40px")};
  display: flex;
  align-items: ${(props) =>
    props.posicionModal ? props.posicionModal : "center"};
  justify-content: center;
  z-index: 999;
  @media only screen and (max-width: 767px) {
    padding: 10px;
  }
`;

const ContenedorModal = styled.div`
  width: ${(props) => (props.width ? props.width : "500px")};
  min-height: 100px;
  background: ${(props) => (props.colorFondo ? props.colorFondo : "#fff")};
  color: ${(props) => (props.colorFondo ? "#fff" : "#000")};
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: ${(props) => (props.padding ? props.padding : "20px")};
`;

const ContenedorModalVideo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.8);
`;

const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;

  h3 {
    font-weight: 600;
    font-size: 20px;
    /* color: #1766dc; */
  }
`;
const BotonCerrar = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #1766dc;

  &:hover {
    background: #f2f2f2;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

const EncabezadoModalVideo = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 12vh;
  padding: 0px 10vw;
  color: white;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-around;
  @media only screen and (max-width: 767px) {
    padding: 0px 6vw;
    font-size: 14px;
    gap: .5rem;
  }
`;

const ContenedorTitulos = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media only screen and (max-width: 767px) {
    flex-direction: column;
  }

`;
