package com.apidev.usuario.entities;

import com.apidev.usuario.dtos.UsuarioDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "tb_usuario")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioEntity {

    private Long id;
    private String nome;
    private String tipoUsuario;
    private String email;
    private String senha;
    private boolean ativo;

    public static UsuarioEntity from(UsuarioDTO usuarioDTO) {
        return UsuarioEntity
                .builder()
                .id(usuarioDTO.getId())
                .nome(usuarioDTO.getNome())
                .tipoUsuario(usuarioDTO.getTipoUsuario())
                .email(usuarioDTO.getEmail())
                .senha(usuarioDTO.getSenha())
                .ativo(usuarioDTO.isAtivo())
                .build();
    }
}
