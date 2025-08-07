package com.apidev.usuario.dtos;

import com.apidev.usuario.enums.EnumTipoUsuario;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UsuarioFilterDTO {

    private String nome;
    private String email;
    private EnumTipoUsuario tipoUsuario;
}
