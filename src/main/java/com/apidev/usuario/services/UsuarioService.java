package com.apidev.usuario.services;

import com.apidev.usuario.dtos.UsuarioDTO;
import com.apidev.usuario.entities.UsuarioEntity;
import com.apidev.usuario.repositories.UsuarioRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Page<UsuarioDTO> findAll(int page, int size) {
        Page<UsuarioEntity> listaUsuarios = repository.findAll(PageRequest.of(page, size));

        return listaUsuarios.map(UsuarioDTO::of);
    }

    public List<UsuarioDTO> listarUsuarios() {
        List<UsuarioDTO> listaDeUsuariosDTO = new ArrayList<>();

        List<UsuarioEntity> usuarioEntityList = repository.findAll();

        for(UsuarioEntity usuarioEntity : usuarioEntityList) {
            listaDeUsuariosDTO.add(UsuarioDTO.of(usuarioEntity));
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

    public void updateUsuario(Long id, UsuarioDTO usuarioDTO) {
        Optional<UsuarioEntity> usuarioEntityOptional = repository.findById(id);

        if(usuarioEntityOptional.isEmpty()) {
            throw new IllegalArgumentException("Usuário não encontrado por esse ID: " + id);
        }

        UsuarioEntity usuarioEntity = usuarioEntityOptional.get();
        repository.save(UsuarioEntity.from(usuarioDTO));
    }

    public void deleteUsuario(Long id) {
        if(!repository.existsById(id)) {
            throw new IllegalArgumentException("Usuário não encontrado por esse ID: " + id);
        }

        repository.deleteById(id);
    }
}
