package com.apidev.endereco.controllers;

import com.apidev.endereco.dtos.EnderecoDTO;
import com.apidev.endereco.services.EnderecoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity addEndereco(EnderecoDTO enderecoDTO) {
        return ResponseEntity.ok(enderecoService.addEndereco(enderecoDTO));
    }

    @PutMapping("/{cep}")
    public ResponseEntity updateEndereco(String cep, EnderecoDTO enderecoDTO) {
        return ResponseEntity.ok(enderecoService.updateEndereco(cep, enderecoDTO));
    }

    @DeleteMapping("/id")
    public ResponseEntity<Void> delete (Long id) {
        enderecoService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
