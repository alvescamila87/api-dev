package com.apidev.produto.controllers;

import com.apidev.produto.dtos.ProdutoDTO;
import com.apidev.produto.services.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/produto")
@RequiredArgsConstructor
public class ProdutoContorller {

    private final ProdutoService produtoService;

    @GetMapping
    public ResponseEntity<Page<ProdutoDTO>> listarProdutos(
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(produtoService.findAll(page, size));
    }

    @PostMapping
    public ResponseEntity<ProdutoDTO> addProduto(@RequestBody ProdutoDTO produtoDTO) {
        boolean result = produtoService.addProduto(produtoDTO);

        if(!result) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateProduto(@PathVariable Long id, @RequestBody ProdutoDTO produtoDTO) {
        boolean result = produtoService.updateProduto(produtoDTO, id);

        if(!result) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }
}
