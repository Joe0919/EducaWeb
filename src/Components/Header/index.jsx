import { styled } from "styled-components";
import logo from "../../assets/images/Logo3.png";
import { Btn, Container, Logo } from "../UI";
import { Link } from "react-router-dom";

const Header = styled(Container)`
  display: flex;
  justify-content: space-between;

  height: 12vh;
  align-items: center;
  background-color: black;
  width: 100%;
  border-bottom: 3px solid #2a7ae4;
`;

export default () => {
  return (
    <Header>
      <Link to={`/`}>
        <Logo src={logo} alt="Logo EducaWeb" />
      </Link>
      <Btn>Nuevo Video</Btn>
    </Header>
  );
};
