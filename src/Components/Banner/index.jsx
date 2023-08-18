import { styled } from "styled-components";
import { Container, Title } from "../UI";


export default (props) => {


  return (
    <Banner>
      <BannerDiv>
        <BannerContent>
          <Title style={{ backgroundColor: props.categorias.color }}>{props.videos.categoria}</Title>
          <div className="desc">
            <h3 className="desc-title">Challenge React</h3>
            <p className="desc-text">
              Este challenge es una forma de aprendizaje. Es un mecanismo donde
              podrás comprometerte en la resolución de un problema para poder
              aplicar todos los conocimientos adquiridos en la formación React.
            </p>
          </div>
        </BannerContent>
        <BannerContent>
          <VideoBanner
            className="video"
            src={props.videos.link}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></VideoBanner>
        </BannerContent>
      </BannerDiv>
    </Banner>
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
  text-align: justify;
`;

const VideoBanner = styled.iframe`
  width: 100%;
  border: 3px solid black;
  height: 380px;
`;
