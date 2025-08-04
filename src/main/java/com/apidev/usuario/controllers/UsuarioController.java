package com.apidev.usuario.controllers;

import com.apidev.usuario.dtos.UsuarioDTO;
import com.apidev.usuario.services.UsuarioService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Page<UsuarioDTO>> paginacaoUsuario(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(service.findAll(page, size));
    }

//    @GetMapping
//    public List<UsuarioDTO> listarUsuarios() {
//        return service.listarUsuarios();
//    }

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
