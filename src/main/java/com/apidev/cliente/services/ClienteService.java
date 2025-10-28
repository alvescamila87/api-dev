package com.apidev.cliente.services;

import com.apidev.cliente.dtos.ClienteDTO;
import com.apidev.cliente.repositories.ClienteRepository;
import com.apidev.usuario.exceptions.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public void addCliente(ClientDTO clienteDTO) {
    }

    public void setValues(ClienteDTO clienteDTO) {
        if(clienteDTO == null){
            throw new ValidationException("Campos obrigatórios não preenchidos.");
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
