package com.apidev.endereco.controllers;

import com.apidev.endereco.dtos.EnderecoDTO;
import com.apidev.endereco.services.EnderecoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequestMapping("/cep")
@RequiredArgsConstructor
public class EnderecoController {

    private final EnderecoService enderecoService;

    @GetMapping
    public ResponseEntity<Page<EnderecoDTO>> findAllByCep(
                    @RequestParam(name = "page") int page,
                    @RequestParam(name = "size") int size,
                    @RequestParam(name = "cep") String cep
     ) {
        return ResponseEntity.ok(enderecoService.findAll(page, size, cep));
    }
}
