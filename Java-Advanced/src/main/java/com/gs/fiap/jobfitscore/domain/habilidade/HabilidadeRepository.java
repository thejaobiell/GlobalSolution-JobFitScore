package com.gs.fiap.jobfitscore.domain.habilidade;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HabilidadeRepository extends JpaRepository<Habilidade, Long> {
	
	@Query("""
        SELECT h
        FROM Habilidade h
        JOIN VagaHabilidade vh ON vh.habilidade.id = h.id
        WHERE vh.vaga.id = :vagaId
    """)
	List<Habilidade> buscarPorVagaId( Long vagaId);
}
