package com.apidev.usuario.dtos;

import com.apidev.usuario.entities.UsuarioEntity;
import com.apidev.usuario.enums.EnumTipoPermissao;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {

    private Long id;

    @NotBlank(message = "Nome é um campo obrigatório")
    @Size(max = 255, message = "O nome pode ter ATÉ {max} caracteres")
    private String nome;

    @NotNull(message = "Tipo de permissão é um campo obrigatório")
    private EnumTipoPermissao tipoPermissao;

    @NotBlank(message = "E-mail é um campo obrigatório")
    @Email(message = "Informe um e-mail válido")
    private String email;

    @NotBlank(message = "Senha é um campo obrigatório")
    @Size(min = 6, max = 25, message = "A senha deve ter entre {min} e {max} caracteres")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,25}$",
            message = "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial")
    private String senha;

    @Builder.Default
    private boolean ativo = true;

    public static UsuarioDTO of(UsuarioEntity usuarioEntity) {
        return UsuarioDTO
                .builder()
                .id(usuarioEntity.getId())
                .nome(usuarioEntity.getNome())
                .tipoPermissao(usuarioEntity.getTipoPermissao())
                .email(usuarioEntity.getEmail())
                .senha(usuarioEntity.getSenha())
                .ativo(usuarioEntity.isAtivo())
                .build();
    }
}
