import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyles";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Home } from "./Pages/Home";
import Categorias from "./Pages/Categorias";
import Videos from "./Pages/Videos";
import NotFound from "./Pages/NotFound";
import { useState } from "react";
import { styled } from "styled-components";
import { BotonNew } from "./Components/UI";

function App() {
  const [mainLoad, setMainLoad] = useState(false);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Router>
      <GlobalStyle />
      {mainLoad ? (
        <Error>
          <div className="face">
            <div className="eye"></div>
            <div className="eye right"></div>
            <div className="mouth sad"></div>
          </div>
          <div className="des-error">
            <h1>No se puede acceder a este sitio.</h1>
            Lo Sentimos, hubo un error al cargar los datos.
            <p>Las causas pueden ser: </p>
            <ul>
              <li>Problemas con la red</li>
              <li>Problemas con el servidor</li>
            </ul>
          </div>
          <div className="btn-content">
            <BotonNew onClick={handleReload}>Reintentar</BotonNew>
          </div>
        </Error>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home setMainLoad={setMainLoad} />} />
            <Route
              path="/categorias"
              element={<Categorias setMainLoad={setMainLoad} />}
            />
            <Route
              path="/videos"
              element={<Videos setMainLoad={setMainLoad} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;

const Error = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .face {
    width: 22%;
    max-width: 170px;
    height: 22%;
    background: #fcfcfc;
    border-radius: 50%;
    border: 1px solid black;
    top: 21%;
    left: 37.5%;
    z-index: 2;
    animation: bounce 1s ease-in infinite;
  }

  .eye {
    position: absolute;
    width: 12px;
    height: 12px;
    background: black;
    border-radius: 50%;
    top: 40%;
    left: 20%;
  }

  .right {
    left: 68%;
  }

  .mouth {
    position: absolute;
    top: 50%;
    left: 41%;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  .sad {
    top: 60%;
    border: 3px solid;
    border-color: black transparent transparent black;
    transform: rotate(45deg);
  }

  @keyframes bounce {
    50% {
      transform: translateY(-10px);
    }
  }

  .des-error {
    padding: 1rem 0;
    color: white;
    line-height: 2rem;
    h1 {
      margin: 0.5rem 0;
    }
    li {
      margin-left: 1rem;
    }
  }
`;
