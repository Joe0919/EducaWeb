import { styled } from "styled-components";
import { Container, Logo } from "../UI";
import logo from "../../assets/images/Logo3.png";

const Footer = styled(Container)`
  color: white;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  border-top: 3px solid #2a7ae4;
`;

const LogoFooter = styled(Logo)`
  width: 12em;
`;

export default () => {
  return (
    <Footer>
      <LogoFooter src={logo} alt="Logo EducaWeb" />
    </Footer>
  );
};
