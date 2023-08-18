import { styled } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const Carrusel = styled.div`
  margin: 0;
  width: 70vw;
`;
const Video = styled.iframe`
  height: 200px;
  width: 100%;
  border: 3px solid black;
`;

export default (props) => {
  const { color, datos } = props;
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
          const { id, link } = dato;
          return (
            <SwiperSlide key={id}>
              <Link to={`/video/${id}`} >
                <Video
                  src={link}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  style={{ border: `3px solid ${color}` }}
                ></Video>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Carrusel>
  );
};
