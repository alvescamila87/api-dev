package com.apidev.endereco.services;

import com.apidev.endereco.dtos.EnderecoDTO;
import com.apidev.endereco.entity.EnderecoEntity;
import com.apidev.endereco.repositories.EnderecoRepository;
import com.apidev.usuario.exceptions.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EnderecoService {

    private final EnderecoRepository enderecoRepository;

    public Page<EnderecoDTO> findAll(int pageNumber, int pageSize, String cep) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by("cep").ascending());

        Page<EnderecoEntity> listaEnderecoEntity;

        if(cep != null && !cep.isEmpty()) {
            listaEnderecoEntity = enderecoRepository.findAllByCep(cep, pageRequest);
        } else {
            listaEnderecoEntity = enderecoRepository.findAll(pageRequest);
        }

        return listaEnderecoEntity.map(EnderecoDTO::of);
    }

    public boolean addEndereco(EnderecoDTO enderecoDTO) {
        validInput(enderecoDTO);

        enderecoRepository.save(EnderecoEntity.from(enderecoDTO));

        return true;
    }

    public boolean updateEndereco(String cep, EnderecoDTO enderecoDTO) {
        findByCep(cep);

        validInput(enderecoDTO);

        enderecoRepository.save(EnderecoEntity.from(enderecoDTO));

        return true;
    }

    public void delete (Long id) {
        findById(id);
        enderecoRepository.deleteById(id);
    }

    public EnderecoDTO findById(Long id) {
        EnderecoEntity enderecoEntity = enderecoRepository.findById(id).orElseThrow(() -> new ValidationException("Não foi encontrado endereço com esse ID."));

        return EnderecoDTO.of(enderecoEntity);
    }

    public EnderecoDTO findByCep(String cep) {
        Optional<EnderecoEntity> enderecoEntityOptional = enderecoRepository.findByCep(cep);

        if(enderecoEntityOptional.isEmpty()) {
            throw  new ValidationException("Não foi encontrado nenhum endereço com esse CEP: " + cep);
        }

        return EnderecoDTO.of(enderecoEntityOptional.get());
    }

    protected void validInput(EnderecoDTO enderecoDTO) {
        if(enderecoDTO == null) {
            throw new ValidationException("Campos obrigatórios não preenchidos");
        }

        if(enderecoDTO.getCep().isBlank()) {
            throw new ValidationException("CEP é obrigatório.");
        }

    }
}
