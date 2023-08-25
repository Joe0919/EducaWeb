import "swiper/css";

import { useEffect, useState } from "react";
import { buscar } from "../Api/api";
import Categoria from "../Components/Categoria";
import { Container, Main } from "../Components/UI";
import Banner from "../Components/Banner";
import { styled } from "styled-components";

export const Home = () => {
  const [videos, setVideos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscar(`/videos`, setVideos, setLoading);
    buscar(`/categorias`, setCategorias, setLoading);
  }, []);

  if (loading) {
    return <div className="carga">Cargando...</div>;
  }

  return (
    <Main>
      {categorias.length > 0 && videos.length > 0 && (
          <Banner
            videos={videos.filter(
              (video) => video.categoria === categorias[0].nombre
            )}
            categorias={categorias[0]}
          />
      )}


      <DivCategorias>
        <div>
          {categorias.map(
            (categoria, index) =>
              index !== 0 && (
                <Categoria
                  key={index}
                  datos={categoria}
                  videos={videos.filter(
                    (video) => video.categoria === categoria.nombre
                  )}
                />
              )
          )}
        </div>
      </DivCategorias>
    </Main>
  );
};

const DivCategorias = styled(Container)`
  background-color: transparent;
`