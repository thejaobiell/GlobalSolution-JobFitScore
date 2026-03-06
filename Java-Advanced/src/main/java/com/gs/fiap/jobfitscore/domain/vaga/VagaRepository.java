package com.gs.fiap.jobfitscore.domain.vaga;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VagaRepository extends JpaRepository<Vaga, Long> {
	List<Vaga> findByEmpresaId( Long empresaId);
}
