package com.apidev.usuario.controllers;

import com.apidev.usuario.dtos.UsuarioListaDTO;
import com.apidev.usuario.services.UsuarioService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
