import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListaUsuario from "./components/Usuario/components/List";
import { Home } from "./pages/home/Home";
import { LayoutContainer } from "./components/layout-container/LayoutContainer";

export function App() {
  return (
    <BrowserRouter>
      <LayoutContainer>
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<ListaUsuario />} />
          <Route path="/produtos" element={<ListaUsuario />} />
        </Routes>
      </LayoutContainer>
    </BrowserRouter>
  );
}
