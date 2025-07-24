package com.apidev.usuario.services;

import com.apidev.usuario.dtos.UsuarioListaDTO;
import com.apidev.usuario.entities.UsuarioEntity;
import com.apidev.usuario.repositoris.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public List<UsuarioListaDTO> listarUsuarios() {
        List<UsuarioListaDTO> listaDeUsuariosDTO = new ArrayList<>();

        List<UsuarioEntity> usuarioEntityList = repository.findAll();

        for(UsuarioEntity usuarioEntity : usuarioEntityList) {
            listaDeUsuariosDTO.add(UsuarioListaDTO.of(usuarioEntity));
        }

        return listaDeUsuariosDTO;
    }

    public void deleteUsuario(Long id) {
        if(!repository.existsById(id)) {
            throw new IllegalArgumentException("Usuário não encontrado por esse ID: " + id);
        }

        repository.deleteById(id);
    }
}
