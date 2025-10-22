package com.apidev.cliente.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EnumTipoPessoa {
    FISICA("Pessoa física"),
    JURIDICA("Pessoa jurídica");

    private String descricao;
}
