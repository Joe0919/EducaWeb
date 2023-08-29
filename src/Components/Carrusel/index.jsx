import { styled } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { IconoPlay } from "../UI";

export default (props) => {
  const { color, datos, verVideo } = props;
  return (
    <Carrusel>
      <Swiper
        modules={[Navigation, Autoplay]}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        spaceBetween={0}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 25,
          },
          "@0.50": {
            slidesPerView: 1.25,
            spaceBetween: 25,
          },
          "@1.00": {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          "@1.25": {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          "@1.50": {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          "@1.75": {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {datos.map((dato) => {
          const { id, imagen } = dato;
          return (
            <SwiperSlide key={id} onClick={() => verVideo(dato)} >
              {/* <Link to={`/video/${id}`} title={`Ver: ${titulo}`}> */}
                <VideoImg
                  src={imagen}
                  style={{ border: `3px solid ${color}` }}
                ></VideoImg>
                <IconoPlayCarrusel title="Ver Video">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    className="bi bi-play-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                  </svg>
                </IconoPlayCarrusel>
              {/* </Link> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Carrusel>
  );
};

const Carrusel = styled.div`
  margin: 0;
  width: 70vw;
`;
const VideoImg = styled.img`
  /* height: 200px; */
  width: 100%;
  border-radius: 8px;
  transition: all 0.3s;
  position: relative;
  &:hover {
    filter: brightness(80%);
  }
`;

const IconoPlayCarrusel = styled(IconoPlay)`
  height: 50px;
  width: 70px;
`;
