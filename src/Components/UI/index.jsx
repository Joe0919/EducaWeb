import { styled } from "styled-components";

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
  font-size: 40px;
  font-weight: normal;
  text-align: center;
`;
export const Main = styled.main`
  background-color: #191919;
  color: white;
`;
export const MainPadding = styled(Main)`
  padding: 2vh 15vw;
`;
