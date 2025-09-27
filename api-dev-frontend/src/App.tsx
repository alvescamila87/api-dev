import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ListaCategoria } from "./components/Categoria";
import { LayoutContainer } from "./components/layout-container/LayoutContainer";
import { ListaProduto } from "./components/Produto";
import ListaUsuarioTanStack from "./components/Usuario/components/List/indexTanStack";
import { Home } from "./pages/Home/Home";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LayoutContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/usuarios-old sem tanstack" element={<ListaUsuario />} /> */}
            <Route path="/usuarios" element={<ListaUsuarioTanStack />} />
            <Route path="/categorias" element={<ListaCategoria />} />
            <Route path="/produtos" element={<ListaProduto />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
          />
        </LayoutContainer>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
