import { styled } from "styled-components";

export const Icono = styled.img`
  height: 25px;
  width: 25px;
`;

export const Btn = styled.button`
  display: block;
  border-radius: 5px;
  background-color: black;
  border: 2px solid white;
  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 30px;
  cursor: pointer;
`;
export const Logo = styled.img`
  width: 120px;
`;
export const Container = styled.div`
  background-color: black;
  padding: 0 15vw;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentStart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
export const Title = styled.h1`
  width: fit-content;
  padding: 5px 20px;
  font-size: 40px;
  font-weight: normal;
  color: white;
`;
export const Titulo1 = styled.h1`
  font-size: 35px;
  font-weight: normal;
  text-align: center;
`;
export const Titulo3 = styled.h3`
  font-size: 1.9rem;
  font-weight: 500;
  margin-bottom: 20px;
`;
export const Parrafo = styled.p`
  font-size: 1.1rem;
`;

export const Main = styled.main`
  background-color: #191919;
  color: white;
`;
export const MainPadding = styled(Main)`
  padding: 2vh 15vw;
`;


export const IconoPlay = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: red;
  height: 60px;
  width: 100px;
  border-radius: 20%;
  opacity: 0;
  transition: all 0.5s;
  color: white;
  &:hover {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;
