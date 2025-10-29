package com.apidev.cliente.services;

import com.apidev.cliente.dtos.ClienteDTO;
import com.apidev.cliente.entity.ClienteEntity;
import com.apidev.cliente.repositories.ClienteRepository;
import com.apidev.usuario.exceptions.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public boolean addCliente(ClienteDTO clienteDTO) {

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
}
