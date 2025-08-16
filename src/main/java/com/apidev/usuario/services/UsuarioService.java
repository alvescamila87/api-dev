package com.apidev.usuario.services;

import com.apidev.usuario.dtos.UsuarioDTO;
import com.apidev.usuario.dtos.UsuarioFilterDTO;
import com.apidev.usuario.entities.UsuarioEntity;
import com.apidev.usuario.exceptions.ValidationException;
import com.apidev.usuario.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository repository;

    public Page<UsuarioDTO> findAll(int page, int size, String nome) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("nome").ascending());

        Page<UsuarioEntity> listaUsuarios;

        if (nome != null && !nome.isEmpty()) {
            listaUsuarios = repository.findAllByNomeContainingIgnoreCase(nome, pageRequest);
        } else {
            listaUsuarios = repository.findAll(pageRequest);
        }

        return listaUsuarios.map(UsuarioDTO::of);
    }

    public Page<UsuarioDTO> findAllComFiltro(int page, int size, UsuarioFilterDTO filter) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("nome").ascending());

        Page<UsuarioEntity> listaUsuarios;

        if (filter == null) {
            return repository.findAll(pageRequest).map(UsuarioDTO::of);
        }

        if (StringUtils.isNotBlank(filter.getNome())) {
            listaUsuarios = repository.findAllByNomeContainingIgnoreCase(filter.getNome(), pageRequest);
        } else if (StringUtils.isNotBlank(filter.getEmail())) {
            listaUsuarios = repository.findAllByEmailContainingIgnoreCase(filter.getEmail(), pageRequest);
        } else if (filter.getTipoUsuario() != null) {
            listaUsuarios = repository.findByTipoUsuario(filter.getTipoUsuario(), pageRequest);
        } else {
            return repository.findAll(pageRequest).map(UsuarioDTO::of);
        }

        return listaUsuarios.map(UsuarioDTO::of);
    }

    public List<UsuarioDTO> listarUsuarios() {
        List<UsuarioDTO> listaDeUsuariosDTO = new ArrayList<>();

        List<UsuarioEntity> usuarioEntityList = repository.findAll();

        for (UsuarioEntity usuarioEntity : usuarioEntityList) {
            listaDeUsuariosDTO.add(UsuarioDTO.of(usuarioEntity));
        }

        return listaDeUsuariosDTO;
    }

    public boolean addUsuario(UsuarioDTO usuarioDTO) {

        validarInput(usuarioDTO);

        emailJaCadastrado(usuarioDTO.getEmail());

        final var usuarioEntity = repository.save(UsuarioEntity.from(usuarioDTO));

        UsuarioDTO.of(usuarioEntity);

        return true;
    }

    public boolean updateUsuario(Long id, UsuarioDTO usuarioDTO) {
        UsuarioEntity usuarioExistente = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado por esse ID: " + id));

        validarInput(usuarioDTO);

        Optional<UsuarioEntity> usuarioComNovoEmail = repository.findByEmail(usuarioDTO.getEmail());

        if (usuarioComNovoEmail.isPresent() && !usuarioComNovoEmail.get().getId().equals(id)) {
            throw new ValidationException("E-mail já cadastrado para outro usuário.");
        }

        usuarioExistente.setNome(usuarioDTO.getNome());
        usuarioExistente.setTipoUsuario(usuarioDTO.getTipoUsuario());
        usuarioExistente.setSenha(usuarioDTO.getSenha());
        usuarioExistente.setAtivo(usuarioDTO.isAtivo());

        repository.save(usuarioExistente);

        return true;
    }

    public void deleteUsuario(Long id) {
        findById(id);

        repository.deleteById(id);
    }

    protected void findById(Long id) {

        Optional<UsuarioEntity> usuarioEntity = repository.findById(id);

        if (usuarioEntity.isEmpty()) {
            throw new IllegalArgumentException("Usuário não encontrado por esse ID: " + id);
        }
    }

    protected void emailJaCadastrado(String email) {
        if (email == null) {
            return;
        }

        Optional<UsuarioEntity> usuarioEntity = repository.findByEmail(email);

        if (usuarioEntity.isPresent()) {
            throw new ValidationException("E-mail já cadastrado.");
        }
        ;
    }

    protected void validarInput(UsuarioDTO usuarioDTO) {
        if (usuarioDTO == null) {
            throw new ValidationException("Campo obrigatórios não preenchidos.");
        }

        if (StringUtils.isBlank(usuarioDTO.getNome())) {
            throw new ValidationException("Favor informar o NOME completo.");
        }

        if (usuarioDTO.getTipoUsuario() == null) {
            throw new ValidationException("Favor informar o TIPO DE USUÁRIO.");
        }

        if (StringUtils.isBlank(usuarioDTO.getSenha())) {
            throw new ValidationException("Favor informar a SENHA.");
        }

        if (usuarioDTO.getSenha().length() < 6 || usuarioDTO.getSenha().length() > 25) {
            throw new ValidationException("A senha deve de 6 a 25 caracteres.");
        }

        if (StringUtils.isBlank(usuarioDTO.getEmail())) {
            throw new ValidationException("Favor informar o E-MAIL.");
        }
    }
}
