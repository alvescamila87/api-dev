package com.apidev.usuario.controllers;

import com.apidev.usuario.dtos.UsuarioDTO;
import com.apidev.usuario.dtos.UsuarioListaDTO;
import com.apidev.usuario.services.UsuarioService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<UsuarioListaDTO> listarUsuarios() {
        return usuarioService.listarUsuarios();
    }


    @GetMapping
    public Page<UsuarioListaDTO> listarUsuarios(
                    @RequestParam(defaultValue = "") String nome,
                    @RequestParam(defaultValue = "0") int page,
                    @RequestParam(defaultValue = "10") int size
    ) {
        return usuarioService.listarUsuarios(nome, page, size);
    }

    @PostMapping
    public UsuarioDTO addUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        return usuarioService.addUsuario(usuarioDTO);
    }

    @PutMapping("/{id}")
    public void updateUsuario(@PathVariable("id") Long Id, @RequestBody UsuarioDTO usuarioDTO) {
        usuarioService.updateUsuario(Id, usuarioDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteUsuario(id);
    }
}
