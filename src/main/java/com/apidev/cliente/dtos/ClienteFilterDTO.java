package com.apidev.cliente.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ClienteFilterDTO {

    private  String nome;
    private String documento;
}
