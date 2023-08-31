import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyles";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Home } from "./Pages/Home";
import Video from "./Pages/Video";
import Categorias from "./Pages/Categorias";
import Videos from "./Pages/Videos";
import NotFound from "./Pages/NotFound";

function App() {
  // const [tema, setTema] = useState(true);
  // const toggleTema = () => {
  //   setTema((tema) => !tema);
  // };

  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
