package com.apidev.usuario.controllers;

import com.apidev.usuario.dtos.UsuarioDTO;
import com.apidev.usuario.services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService service;

    @GetMapping
    public ResponseEntity<Page<UsuarioDTO>> paginacaoUsuario(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "nome", required = false) String nome
    ) {
        return ResponseEntity.ok(service.findAll(page, size, nome));
    }

    @PostMapping
    public UsuarioDTO addUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        return service.addUsuario(usuarioDTO);
    }

    @PutMapping("/{id}")
    public void updateUsuario(@PathVariable("id") Long Id, @RequestBody UsuarioDTO usuarioDTO) {
        service.updateUsuario(Id, usuarioDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        service.deleteUsuario(id);
    }
}
