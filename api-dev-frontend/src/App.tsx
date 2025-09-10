import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListaUsuario from "./components/Usuario/components/List";
import { Home } from "./pages/home/Home";
import { LayoutContainer } from "./components/layout-container/LayoutContainer";
import ListaUsuarioTanStack from "./components/Usuario/components/List/indexTanStack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LayoutContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usuarios" element={<ListaUsuario />} />
            <Route
              path="/usuarios-tanstack"
              element={<ListaUsuarioTanStack />}
            />
            <Route path="/produtos" element={<ListaUsuario />} />
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
