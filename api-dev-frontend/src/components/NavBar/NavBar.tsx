import { AppBar, MenuItem, Toolbar } from "@mui/material";

export function NavBar() {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <MenuItem>Home</MenuItem>
          <MenuItem>Usuarios</MenuItem>
          <MenuItem>Produtos</MenuItem>
        </Toolbar>
      </AppBar>
    </>
  );
}
