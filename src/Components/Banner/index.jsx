import { styled } from "styled-components";
import { Container, IconoPlay, Parrafo, Title, Titulo1, Titulo3 } from "../UI";
import Carrusel from "../Carrusel";

export default (props) => {
  const { videos, categorias, verVideo } = props;
  const { categoria, imagen } = videos[0];
  const { color } = categorias;

  return (
    <>
      <Banner>
        {props.videos.length > 0 && (
          <BannerDiv>
            <BannerContent>
              <Title style={{ backgroundColor: color }}>{categoria}</Title>
              <div className="desc">
                <Titulo3>Challenge React</Titulo3>
                <Parrafo>
                  Este challenge es una forma de aprendizaje. Es un mecanismo
                  donde podrás comprometerte en la resolución de un problema
                  para poder aplicar todos los conocimientos adquiridos en la
                  formación React.
                </Parrafo>
              </div>
            </BannerContent>
            <BannerContent onClick={() => verVideo(videos[0])}>
              <ImgVideoBanner
                src={imagen}
                alt="Video"
                style={{ border: `3px solid ${color}` }}
              />
              {/* <VideoBanner
                className="video"
                src={props.videos[0].link}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></VideoBanner> */}
              <IconoPlay title="Ver Video">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
              </IconoPlay>
            </BannerContent>
          </BannerDiv>
        )}
      </Banner>

      <VideosSimilares>
        <Titulo1>
          Videos Relacionados a{" "}
          <strong style={{ color: color }}>{categoria}</strong>{" "}
        </Titulo1>
        <Carrusel
          datos={videos.filter((video, i) => i !== 0)}
          color={color}
          verVideo={verVideo}
        />
      </VideosSimilares>
    </>
  );
};

const Banner = styled(Container)`
  display: flex;
  align-items: flex-end;
  height: calc(100vh - 12vh);
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(/src/assets/images/portada.png) no-repeat center / cover;
`;

const BannerDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  padding-bottom: 2rem;
  align-items: center;
`;
const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  gap: 2rem;
  position: relative;
`;

const ImgVideoBanner = styled.img`
  width: 100%;
  border-radius: 8px;
  transition: all 0.5s;
  &:hover {
    filter: brightness(80%);
  }
`;

const VideosSimilares = styled(Container)`
  display: flex;
  gap: 0.5rem;
  color: white;
  flex-direction: column;
  padding: 2rem 15vw;
  background-color: transparent;
`;
