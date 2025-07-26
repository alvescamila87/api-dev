package com.apidev.usuario.services;

import ch.qos.logback.core.util.StringUtil;
import com.apidev.usuario.dtos.UsuarioDTO;
import com.apidev.usuario.dtos.UsuarioListaDTO;
import com.apidev.usuario.entities.UsuarioEntity;
import com.apidev.usuario.repositoris.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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

    public UsuarioDTO addUsuario(UsuarioDTO usuarioDTO) {
        if(usuarioDTO == null) {
            throw new IllegalArgumentException("Campo obrigatórios não preenchidos.");
        }

        UsuarioEntity.from(usuarioDTO);

        final var usuarioEntity = repository.save(UsuarioEntity.from(usuarioDTO));

        return UsuarioDTO.of(usuarioEntity);
    }

    public void deleteUsuario(Long id) {
        if(!repository.existsById(id)) {
            throw new IllegalArgumentException("Usuário não encontrado por esse ID: " + id);
        }

        repository.deleteById(id);
    }
}
