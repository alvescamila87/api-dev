package com.apidev.categoria.controllers;

import com.apidev.categoria.dtos.CategoriaDTO;
import com.apidev.categoria.services.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categoria")
@RequiredArgsConstructor
public class CategoriaController {

    private final CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<Page<CategoriaDTO>> paginacaoCategoria(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(categoriaService.findAll(page, size));
    }

    @PostMapping
    public ResponseEntity<Void> addCatetoria(CategoriaDTO categoriaDTO) {
        boolean resultado = categoriaService.addCategoria(categoriaDTO);
        if (!resultado) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateCatetoria(@PathVariable Long id, @RequestBody CategoriaDTO categoriaDTO) {
        boolean resultado = categoriaService.updateCategoria(categoriaDTO, id);

        if (!resultado) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCategoria(@PathVariable Long id) {
        categoriaService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
