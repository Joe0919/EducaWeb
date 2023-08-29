import "swiper/css";

import { useEffect, useState } from "react";
import { buscar } from "../Api/api";
import Categoria from "../Components/Categoria";
import {
  Carga,
  Container,
  Contenido,
  Loader,
  Main,
  Video,
  VideoPlayer,
} from "../Components/UI";
import Banner from "../Components/Banner";
import { styled } from "styled-components";
import { Modal } from "../Components/Modal";

export const Home = () => {
  const [active2, setActive2] = useState(false);
  const [videos, setVideos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const [datos, setDatos] = useState({});


  const verVideo = (video) => {
    setDatos(video);
    setActive2(!active2);
  };

  useEffect(() => {
    buscar(`/videos`, setVideos, setLoading);
    buscar(`/categorias`, setCategorias, setLoading);
  }, []);

  if (loading) {
    return (
      <Carga>
        <Loader />
      </Carga>
    );
  }

  return (
    <>
      <Modal
        estado={active2}
        cambiarEstado={setActive2}
        mostrarHeader={false}
        mostrarOverlay={true}
        posicionModal={"start"}
        padding={"0"}
        width={"100vw"}
        paddingOverlay={"0px"}
        colorFondo={"transparent"}
        tipoModal={"ModalVideo"}
        tituloVideo={datos?.titulo || ""}
        categoriaVideo={datos?.categoria || ""}
      >
        <Contenido>
          <Video>
            <VideoPlayer
              src={datos.link}
              title={datos.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></VideoPlayer>
          </Video>
        </Contenido>
      </Modal>
      <Main>
        {categorias.length > 0 && videos.length > 0 && (
          <Banner
            videos={videos.filter(
              (video) => video.categoria === categorias[0].nombre
            )}
            categorias={categorias[0]}
            verVideo={verVideo}
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
                    verVideo={verVideo}
                  />
                )
            )}
          </div>
        </DivCategorias>
      </Main>
    </>
  );
};

const DivCategorias = styled(Container)`
  background-color: transparent;
`;
