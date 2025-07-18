package com.apidev.usuario.dtos;

import com.apidev.usuario.entities.UsuarioEntity;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {

    private Long id;
    private String nome;
    private String tipoUsuario;
    private String email;
    private String senha;
    private boolean ativo;

    public static UsuarioDTO of(UsuarioEntity usuarioEntity) {
        return UsuarioDTO.of(usuarioEntity);
    }
}
