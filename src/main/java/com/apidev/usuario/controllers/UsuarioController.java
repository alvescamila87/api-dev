package com.apidev.usuario.controllers;

import com.apidev.usuario.dtos.UsuarioDTO;
import com.apidev.usuario.dtos.UsuarioFilterDTO;
import com.apidev.usuario.services.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService service;

    @GetMapping("/paginacao-1-filtro-basico")
    public ResponseEntity<Page<UsuarioDTO>> paginacaoUsuario(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "nome", required = false) String nome
    ) {
        return ResponseEntity.ok(service.findAll(page, size, nome));
    }

    @GetMapping("/paginacao-2-filtro-complexo")
    public ResponseEntity<Page<UsuarioDTO>> paginacaoUsuarioComFiltroComplexo(
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "10") int size,
        UsuarioFilterDTO filter
    ) {
        return ResponseEntity.ok(service.findAllComFiltro(page, size, filter));
    }

    @PostMapping
    public ResponseEntity<Void> addUsuario(@Valid @RequestBody UsuarioDTO usuarioDTO) {
       boolean resultado = service.addUsuario(usuarioDTO);

       if(!resultado) {
           return ResponseEntity.badRequest().build();
       }

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUsuario(@PathVariable("id") Long Id, @Valid @RequestBody UsuarioDTO usuarioDTO) {
        boolean resultado = service.updateUsuario(Id, usuarioDTO);

        if(!resultado) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        service.deleteUsuario(id);

        return ResponseEntity.noContent().build();
    }
}
