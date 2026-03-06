package com.gs.fiap.jobfitscore.domain.vagahabilidade;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VagaHabilidadeComNomeDTO {
	
	private Long id;
	private Long vagaId;
	private Long habilidadeId;
	private String nome;
	
	public static VagaHabilidadeComNomeDTO fromEntity(VagaHabilidade vh) {
		return new VagaHabilidadeComNomeDTO(
				vh.getId(),
				vh.getVaga().getId(),
				vh.getHabilidade().getId(),
				vh.getHabilidade().getNome()
		);
	}
}