import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import ListaUsuario from "./components/Usuario/components/List";
import { Home } from "./pages/Home/Home";

export function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<ListaUsuario />} />
        <Route path="/produtos" element={<ListaUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}
