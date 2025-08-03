package com.apidev.usuario.query;

public class UsuarioQuery {

    public Page<Pessoa> buscarComFiltro(PessoaFilter filter, Pageable pageable) {
        return pessoaRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.hasText(filter.getNome())) {
                predicates.add(cb.like(cb.upper(root.get("nome")), "%" + filter.getNome().toUpperCase() + "%"));
            }

            if (StringUtils.hasText(filter.getEmail())) {
                predicates.add(cb.like(cb.upper(root.get("email")), "%" + filter.getEmail().toUpperCase() + "%"));
            }

            if (filter.getAtivo() != null) {
                predicates.add(cb.equal(root.get("ativo"), filter.getAtivo()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        }, pageable);
    }

}
