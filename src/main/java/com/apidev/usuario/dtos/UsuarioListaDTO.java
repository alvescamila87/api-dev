package com.apidev.usuario.dtos;

import com.apidev.usuario.entities.UsuarioEntity;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioListaDTO {

    private Long id;
    private String nome;
    private String email;
    private boolean ativo;

    public static UsuarioListaDTO of(UsuarioEntity usuarioEntity) {
        return UsuarioListaDTO.of(usuarioEntity);
    }
}
