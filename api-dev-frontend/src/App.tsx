import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListaUsuario from "./components/Usuario/components/List";
import { Home } from "./pages/Home/Home";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuario" element={<ListaUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}
