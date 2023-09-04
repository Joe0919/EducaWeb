import { styled } from "styled-components";
import { Title } from "../UI";
import Carrusel from "../Carrusel";

const Desc = styled.p`
  display: inline;
`;
const Categoria = styled.div`
  display: flex;
  gap: 0.5rem;
  color: white;
  flex-direction: column;
  padding: 1.5rem 0;
`;
const Con = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media only screen and (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding-bottom: .5rem;
  }
`;

export default (props) => {
  const { nombre, descripcion, color } = props.datos;

  const { videos, verVideo } = props;

  return (
    <>
      {videos.length > 0 && (
        <Categoria>
          <Con>
            <Title style={{ backgroundColor: color }}>{nombre}</Title>
            <Desc>{descripcion}</Desc>
          </Con>
          <Carrusel datos={videos} color={color} verVideo={verVideo} />
        </Categoria>
      )}
    </>
  );
};
