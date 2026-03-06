import api, { IAapi } from "./Api";

/* --------------------------- AUTENTICAÇÃO --------------------------- */
export const login = (email: string, senha: string) =>
	api.post("/autenticacao/login", { email, senha });

/* ----------------------------- USUÁRIOS ----------------------------- */
export const listarUsuarios = () => api.get("/usuarios/listar");

export const buscarUsuarioPorId = (id: number) =>
	api.get(`/usuarios/buscar-por-id/${id}`);

export const buscarUsuarioPorEmail = (email: string) =>
	api.get(`/usuarios/buscar-por-email`, { params: { email } });

export const cadastrarUsuario = (data: {
	nome: string;
	email: string;
	senha: string;
}) => api.post("/usuarios/cadastrar", data);

// ----------------------------- EMPRESAS -----------------------------
export const listarEmpresas = () =>
	api.get("/empresas/listar");

export const buscarEmpresaPorEmail = (email: string) =>
	api.get(`/empresas/buscar-por-email`, { params: { email } });

export const buscarEmpresaPorId = (id: number) =>
	api.get(`/empresas/buscar-por-id/${id}`);

export const cadastrarEmpresa = (data: {
	nome: string;
	cnpj: string;
	email: string;
	senha: string;
}) => api.post("/empresas/cadastrar", data);

/* ------------------------------- VAGAS ------------------------------- */
export const listarVagas = () => api.get("/vagas/listar");

export const buscarVagaPorId = (id: number) =>
	api.get(`/vagas/buscar-por-id/${id}`);

export const buscarVagaPorEmpresa = (empresaId: number) =>
	api.get(`/vagas/buscar-por-empresa/${empresaId}`);

export const cadastrarVaga = (data: { titulo: string; empresaId: number }) =>
	api.post("/vagas/cadastrar", data);

export const atualizarVaga = (id: number, data: any) =>
	api.put(`/vagas/atualizar/${id}`, data);

export const deletarVaga = (id: number) => api.delete(`/vagas/deletar/${id}`);

/* ----------------------------- HABILIDADES ----------------------------- */
export const listarHabilidades = () => api.get("/habilidades/listar");

export const buscarHabilidadePorId = (id: number) =>
	api.get(`/habilidades/buscar-por-id/${id}`);

export const buscarHabilidadesPorVaga = (vagaId: number) =>
	api.get(`/habilidades/buscar-por-vaga/${vagaId}`);

export const cadastrarHabilidade = (data: { nome: string }) =>
	api.post("/habilidades/cadastrar", data);

export const atualizarHabilidade = (id: number, data: any) =>
	api.put(`/habilidades/atualizar/${id}`, data);

export const deletarHabilidade = (id: number) =>
	api.delete(`/habilidades/deletar/${id}`);

/* ------------------------ USUARIO-HABILIDADES ------------------------ */
export const listarUsuarioHabilidades = () =>
	api.get("/usuario-habilidade/listar");

export const buscarUsuarioHabilidadePorId = (id: number) =>
	api.get(`/usuario-habilidade/buscar-por-id/${id}`);

export const buscarUsuarioHabilidadesPorUsuario = (usuarioId: number) =>
	api.get(`/usuario-habilidade/buscar-por-usuario/${usuarioId}`);

export const cadastrarUsuarioHabilidade = (data: {
	usuarioId: number;
	habilidadeId: number;
}) => api.post("/usuario-habilidade/cadastrar", data);

export const deletarUsuarioHabilidade = (id: number) =>
	api.delete(`/usuario-habilidade/deletar/${id}`);

/* ----------------------------- CANDIDATURAS ----------------------------- */
export const cadastrarCandidatura = (data: {
	usuarioId: number;
	vagaId: number;
	status: string;
}) => api.post("/candidaturas/cadastrar", data);

/* --------------------------- VAGA-HABILIDADE --------------------------- */
export const listarVagaHabilidades = () => api.get("/vaga-habilidade/listar");

export const buscarVagaHabilidadePorVaga = (vagaId: number) =>
	api.get(`/vaga-habilidade/buscar-por-vaga`, { params: { vagaId } });

export const buscarVagaHabilidadePorHabilidade = (habilidadeId: number) =>
	api.get(`/vaga-habilidade/buscar-por-habilidade`, {
		params: { habilidadeId },
	});

export const cadastrarVagaHabilidade = (data: {
	vagaId: number;
	habilidadeId: number;
}) => api.post("/vaga-habilidade/cadastrar", data);

export const deletarVagaHabilidade = (id: number) =>
	api.delete(`/vaga-habilidade/deletar/${id}`);

//--------------IA------------------
export const avaliarMatch = (vaga: any, candidato: any) =>
	IAapi.post("/evaluate", {
		vaga,
		candidatos: [candidato],
		use_model: true,
	});
