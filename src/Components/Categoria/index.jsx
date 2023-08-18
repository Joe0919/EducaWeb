import { styled } from "styled-components";
import { Title } from "../UI";
import Carrusel from "../Carrusel";
import { Link } from "react-router-dom";

const Desc = styled.p`
  display: inline;
`;
const Categoria = styled.div`
  display: flex;
  gap: 0.5rem;
  color: white;
  flex-direction: column;
  padding: 2rem 0;
`;
const Con = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default (props) => {
  const { id, nombre, descripcion, color } = props.datos;

  const { videos } = props;


  return (
    <>
      {videos.length > 0 && (
        <Categoria>
          <Con>
            <Link  to={`/video/${id}`} >
                <Title style={{ backgroundColor: color }}>{nombre}</Title>
            </Link >
            <Desc>{descripcion}</Desc>
          </Con>
          <Carrusel datos={videos} color={color}/>
        </Categoria>
      )}
    </>
  );
};
