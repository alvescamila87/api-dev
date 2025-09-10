import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useCreateModal } from "./useCreateModal";
// import type { AxiosError } from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./modal.css";

interface CreateModalProps {
  onClose: () => void;
}

export const CreateModal = ({ onClose }: CreateModalProps) => {
  const {
    mutateUsuario,
    register,
    handleSubmit,
    errors,
    onSubmit,

    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
  } = useCreateModal(onClose);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-body">
        {mutateUsuario?.data?.data?.id ? (
          <h2>Edição de usuário</h2>
        ) : (
          <h2>Cadastro de usuário</h2>
        )}

        <Box
          component="form"
          className="input-container"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Nome"
            {...register("nome")}
            required
            fullWidth
            margin="normal"
            error={!!errors.nome}
            helperText={errors.nome?.message}
          />
          <TextField
            label="E-mail"
            type="email"
            {...register("email")}
            required
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Senha"
            type={showPassword ? "text" : "password"}
            {...register("senha")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            fullWidth
            margin="normal"
            error={!!errors.senha}
            helperText={errors.senha?.message}
          />
          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.tipoPermissao}
            required
          >
            <InputLabel>Tipo de Permissão</InputLabel>
            <Select
              label="Tipo de Permissão"
              defaultValue=""
              {...register("tipoPermissao")}
            >
              <MenuItem value="" disabled>
                Selecione uma opção
              </MenuItem>
              <MenuItem value="ADMIN">Administrador</MenuItem>
              <MenuItem value="GERENTE">Gerente</MenuItem>
              <MenuItem value="OPERADOR">Operador</MenuItem>
              <MenuItem value="VISITANTE">Visitante</MenuItem>
            </Select>
            {errors.tipoPermissao && (
              <Typography color="error" variant="caption" sx={{ ml: 2 }}>
                {errors.tipoPermissao.message}
              </Typography>
            )}
          </FormControl>
          <FormControlLabel
            control={<Checkbox {...register("ativo")} defaultChecked />}
            label="Usuário ativo"
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={mutateUsuario.isPending}
            >
              Salvar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              type="reset"
              onClick={onClose}
              disabled={mutateUsuario.isPending}
            >
              Cancelar
            </Button>
          </div>
        </Box>
        {/* {mutateUsuario.isPending && <Typography>Salvando...</Typography>}
        {mutateUsuario.isError && (
          <Typography color="error">
            Ocorreu um erro: {(mutateUsuario.error as AxiosError).message}
          </Typography>
        )}
        {mutateUsuario.isSuccess && (
          <Typography color="primary">Usuário salvo com sucesso!</Typography>
        )} */}
      </div>
    </div>
  );
};
