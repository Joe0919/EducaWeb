import { keyframes, styled } from "styled-components";

export const Icono = styled.img`
  height: 25px;
  width: 25px;
`;

export const Btn = styled.button`
  display: block;
  border-radius: 5px;
  background-color: black;
  border: 2px solid white;
  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 30px;
  cursor: pointer;
`;
export const Logo = styled.img`
  width: 120px;
`;
export const Container = styled.div`
  background-color: black;
  padding: 0 15vw;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentStart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
export const Title = styled.h1`
  width: fit-content;
  padding: 5px 20px;
  font-size: 40px;
  font-weight: normal;
  color: white;
`;
export const Titulo1 = styled.h1`
  font-size: 35px;
  font-weight: normal;
  text-align: center;
`;
export const Titulo3 = styled.h3`
  font-size: 1.9rem;
  font-weight: 500;
  margin-bottom: 20px;
`;
export const Parrafo = styled.p`
  font-size: 1.1rem;
`;

export const Main = styled.main`
  background-color: #191919;
  color: white;
`;
export const MainPadding = styled(Main)`
  padding: 2vh 15vw;
`;

export const IconoPlay = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: red;
  height: 60px;
  width: 100px;
  border-radius: 20%;
  opacity: 0;
  transition: all 0.5s;
  color: white;
  &:hover {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

export const Contenido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  background-color: white;

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

export const ContenedorBotones = styled.div`
  width: 100%;
  margin: 1rem 0 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ContenedorPag = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export const Boton = styled.button`
  display: inline-flex;
  padding: 10px;
  border-radius: 50%;
  color: #fff;
  border: transparent;
  cursor: pointer;
  transition: 0.3s ease all;
`;

export const Paginacion = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const BotonPag = styled.button`
  padding: 0.6rem;
  font-weight: 600;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  transition: all 0.3s;
  color: #fff;
  stroke-width: 101px;
  &:disabled {
    color: gray;
    background-color: rgba(255, 255, 255, 0.1);
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.35);
  }
  &:disabled:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const BotonEdit = styled(Boton)`
  background: #0b2e62;
  &:hover {
    background: #0066ff;
  }
`;
export const BotonDelete = styled(Boton)`
  background: #760813;
  &:hover {
    background: #b40c1e;
  }
`;
export const BotonView = styled(Boton)`
  background: #0a4b55;
  &:hover {
    background: #17a2b8;
  }
`;
export const BotonClose = styled(Boton)`
  background: #0a4b55;
  padding: 1px;
  &:hover {
    background: #17a2b8;
  }
`;

export const Video = styled.div`
  height: 88vh;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const VideoPlayer = styled.iframe`
  border: transparent;
  position: absolute;
  height: 100%;
  max-height: 600px;
  max-width: 1050px;
  width: 100%;
`;
export const Carga = styled.div`
  color: white;
  font-weight: 600;
  font-size: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 11rem);
  background-color: rgba(0, 0, 0, 0.5);
`;

const rotation = keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
`;

export const Loader = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;
