package com.apidev.cliente.services;

import com.apidev.cliente.dtos.ClienteDTO;
import com.apidev.cliente.entity.ClienteEntity;
import com.apidev.cliente.repositories.ClienteRepository;
import com.apidev.usuario.exceptions.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public boolean addCliente(ClienteDTO clienteDTO) {

        setValues(clienteDTO);

        clienteRepository.save(ClienteEntity.from(clienteDTO));

        return true;
    }

    public boolean updateCliente(Long id, ClienteDTO clienteDTO) {

        findById(id);

        documentoJaExiste(clienteDTO.getDocumento());

        setValues(clienteDTO);

        clienteRepository.save(ClienteEntity.from(clienteDTO));

        return true;
    }

    public void setValues(ClienteDTO clienteDTO) {
        if(clienteDTO == null){
            throw new ValidationException("Campos obrigatórios não preenchidos.");
        }

        if(clienteDTO.getNome().isBlank()) {
            throw new ValidationException("Nome é um campo obrigatório.");
        }

        if(clienteDTO.getSobrenome().isBlank()) {
            throw new ValidationException("Sobrenome é um campo obrigatório.");
        }

        if(clienteDTO.getTipoPessoa().getDescricao().isBlank()) {
            throw new ValidationException("Tipo de pessoa é um campo obrigatório.");
        }

        if(clienteDTO.getDocumento().isBlank()) {
            throw new ValidationException("Documento é um campo obrigatório.");
        }

        if(clienteDTO.getDataNascimento() == null) {
            throw new ValidationException("Data de nascimento é um campo obrigatório.");
        }

        if(clienteDTO.getEndereco().getCep().isBlank()) {
            throw new ValidationException("CEP é um campo obrigatório.");
        }

    }

    public void deleteCliente(Long id) {
        findById(id);
        clienteRepository.deleteById(id);
    }

    public ClienteDTO findById(Long id) {
        final var clienteOptional = clienteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ID: " + id + " não encontrado."));
        return ClienteDTO.of(clienteOptional);
    }

    public ClienteDTO findyDocumento(String documentoCliente) {
        if(documentoCliente == null) {
            throw new ValidationException("Documento: " + documentoCliente + " não informado.");
        }

        Optional<ClienteEntity> clienteEntityOptional = clienteRepository.findByDocumento(documentoCliente);

        if(clienteEntityOptional.isEmpty()) {
            throw new ValidationException("Documento: " + documentoCliente + " não encontrado. Tente outro...");
        }

        return ClienteDTO.of(clienteEntityOptional.get());
    }

    public void documentoJaExiste(String documento) {
        final var result = clienteRepository.existsByDocumento(documento);

        if(result) {
            throw new ValidationException("Documento: " + documento + " já cadastrado. Tente outro...");
        }
    }
}
