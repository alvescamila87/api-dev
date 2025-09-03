import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListaUsuario from "./components/Usuario/components/List";
import { Home } from "./pages/home/Home";
import { LayoutContainer } from "./components/layout-container/LayoutContainer";
import ListaUsuarioTanStack from "./components/Usuario/components/List/indexTanStack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        </LayoutContainer>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
