export type Usuario = {
	id_usuario: number;
	nome: string;
	email: string;
	senha: string;
	is_admin: boolean;
	refresh_token: string | null;
	expiracao_refresh_token: string | null;
};

export type Empresa = {
	id_empresa: number;
	nome: string;
	cnpj: string;
	email: string;
	senha: string;
	refresh_token: string | null;
	expiracao_refresh_token: string | null;
};

export type Vaga = {
	id: number;
	titulo: string;
	empresaId: number;
	nomeEmpresa: string;
};

export type Habilidade = {
	id_habilidade: number;
	nome: string;
};

export type UsuarioHabilidade = {
	id_usuario_habilidade: number;
	usuario_id: number;
	habilidade_id: number;
};

export type Candidatura = {
	id_candidatura: number;
	usuario_id: number;
	vaga_id: number;
	data_candidatura: string;
	status: "Em Análise" | "Triagem" | "Aprovado" | "Reprovado";
};
