import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useCreateModal } from "./useCreateModal";
import type { AxiosError } from "axios";

interface CreateModalProps {
  open: boolean;
}

export const CreateModal = ({ open }: CreateModalProps) => {
  const { mutateUsuario, register, handleSubmit, errors, onSubmit } =
    useCreateModal();

  return (
    // <div className="modal-overflow">
    //   <div className="modal-body">
    //     <h2>Cadastro de usuário</h2>

    //     <Box
    //       component="form"
    //       className="input-container"
    //       onSubmit={handleSubmit(onSubmit)}
    //       sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    //     >
    //       <TextField
    //         label="Nome"
    //         {...register("nome")}
    //         fullWidth
    //         margin="normal"
    //         error={!!errors.nome}
    //         helperText={errors.nome?.message}
    //       />
    //       <TextField
    //         label="E-mail"
    //         type="email"
    //         {...register("email")}
    //         fullWidth
    //         margin="normal"
    //         error={!!errors.email}
    //         helperText={errors.email?.message}
    //       />
    //       <FormControl fullWidth margin="normal" error={!!errors.tipoPermissao}>
    //         <InputLabel>Tipo de Permissão</InputLabel>
    //         <Select
    //           label="Tipo de Permissão"
    //           defaultValue=""
    //           {...register("tipoPermissao")}
    //         >
    //           <MenuItem value="ADMIN">Admin</MenuItem>
    //           <MenuItem value="GERENTE">Gerente</MenuItem>
    //           <MenuItem value="OPERADOR">Operador</MenuItem>
    //           <MenuItem value="VISITANTE">Visitante</MenuItem>
    //         </Select>
    //         {errors.tipoPermissao && (
    //           <Typography color="error" variant="caption" sx={{ ml: 2 }}>
    //             {errors.tipoPermissao.message}
    //           </Typography>
    //         )}
    //       </FormControl>
    //       <FormControlLabel
    //         control={<Checkbox {...register("ativo")} />}
    //         label="Ativo"
    //       />
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         type="submit"
    //         disabled={mutate.isPending}
    //       >
    //         Salvar
    //       </Button>
    //     </Box>
    //     {mutate.isPending && <Typography>Salvando...</Typography>}
    //     {mutate.isError && (
    //       <Typography color="error">
    //         Ocorreu um erro: {(mutate.error as AxiosError).message}
    //       </Typography>
    //     )}
    //     {mutate.isSuccess && (
    //       <Typography color="primary">Usuário salvo com sucesso!</Typography>
    //     )}
    //   </div>
    // </div>
    <h1>Modal</h1>
  );
};
