import "swiper/css";

import { useEffect, useState } from "react";
import { buscar } from "../Api/api";
import Categoria from "../Components/Categoria";
import { Main } from "../Components/UI";
import Banner from "../Components/Banner";

export const Home = () => {
  const [videos, setVideos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    buscar(`/videos`, setVideos);
    buscar(`/categorias`, setCategorias);
  }, []);

console.log(categorias)

  return (
    <Main>
      {/* <Banner
        videos={videos.filter((video) => video.categoria === categorias[0].nombre)}
        categoria={categorias[0]}
      /> */}

      {/* <section className="container carrusel">
        <div className="carrusel">
          <div className="App">
            <Carrusel datos={videos} />
          </div>
        </div>
      </section> */}

      <section className="container categorias">
        <div className="title-categoria">
          {categorias.map((categoria, index) => (
            <Categoria
              key={index}
              datos={categoria}
              videos={videos.filter(
                (video) => video.categoria === categoria.nombre
              )}
            />
          ))}
        </div>
      </section>
    </Main>
  );
};
