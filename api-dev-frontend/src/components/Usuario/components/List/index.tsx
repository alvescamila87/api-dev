import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useUsuario } from "./useUsuario";

export default function ListaUsuario() {
  const { data, isLoading } = useUsuario();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Ativo?</TableCell>
            <TableCell align="right">Nome</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Tipo Permissão</TableCell>
          </TableRow>
        </TableHead>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">
                  {row.ativo ? "Ativo" : "Inativo"}
                </TableCell>
                <TableCell align="right">{row.nome}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.tipoPermissao}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
