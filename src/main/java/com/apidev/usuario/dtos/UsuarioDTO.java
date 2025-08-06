package com.apidev.usuario.dtos;

import com.apidev.usuario.entities.UsuarioEntity;
import com.apidev.usuario.enums.EnumTipoUsuario;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {

    private Long id;
    private String nome;
    private EnumTipoUsuario tipoUsuario;
    private String email;
    private String senha;
    private boolean ativo;

    public static UsuarioDTO of(UsuarioEntity usuarioEntity) {
        return UsuarioDTO
                .builder()
                .id(usuarioEntity.getId())
                .nome(usuarioEntity.getNome())
                .tipoUsuario(usuarioEntity.getTipoUsuario())
                .email(usuarioEntity.getEmail())
                .senha(usuarioEntity.getSenha())
                .ativo(usuarioEntity.isAtivo())
                .build();
    }
}
