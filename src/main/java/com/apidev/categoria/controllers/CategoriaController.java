package com.apidev.categoria.controllers;

import com.apidev.categoria.dtos.CategoriaDTO;
import com.apidev.categoria.services.CaetgoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categoria")
@RequiredArgsConstructor
public class CategoriaController {

    private final CaetgoriaService caetgoriaService;

    @GetMapping
    public ResponseEntity<Page<CategoriaDTO>> paginacaoCategoria(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(caetgoriaService.findAll(page, size));
    }
}
