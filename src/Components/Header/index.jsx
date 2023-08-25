import { styled } from "styled-components";
import logo from "../../assets/images/Logo3.png";
import { Btn, Container, Logo } from "../UI";
import { Link, useLocation } from "react-router-dom";

const Header = styled(Container)`
  display: flex;
  justify-content: space-between;
  z-index: 99;
  height: 12vh;
  align-items: center;
  background-color: black;
  width: 100%;
  border-bottom: 3px solid #2a7ae4;
`;

export default () => {
  const location = useLocation();

  const { pathname } = location;

  return (
    <Header>
      <Link to={`/`}>
        <Logo src={logo} alt="Logo EducaWeb" />
      </Link>
      <Link
        to={
          pathname == "/"
            ? `/videos`
            : pathname === `/videos`
            ? `/categorias`
            : `/`
        }
      >
        <Btn>
          {pathname === "/"
            ? "Todos los videos"
            : pathname === "/videos"
            ? "Ver Categorias"
            : "Ir a Inicio"}
        </Btn>
      </Link>
    </Header>
  );
};
