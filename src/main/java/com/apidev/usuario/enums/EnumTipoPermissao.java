package com.apidev.usuario.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EnumTipoPermissao {
    ADMIN("Administrador"),
    GERENTE("Gerente | Editor"),
    OPERADOR("Operador | Usuário comum"),
    VISITANTE("Visitante | Visualizador");

    private final String descricao;
}


