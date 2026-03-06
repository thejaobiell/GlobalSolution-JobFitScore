import axios from "axios";
import { getJWTUsuario } from "./UsuarioAuthStorage";
import { getJWTEmpresa } from "./EmpresaAuthStorage";

const api = axios.create({
	baseURL: `http://${process.env.EXPO_PUBLIC_IP}:8080/api`,
	headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
	if (config.url?.includes("/autenticacao/login")) {
		return config;
	}

    const tokenUsuario = await getJWTUsuario();
	const tokenEmpresa = await getJWTEmpresa();

	const token = tokenUsuario || tokenEmpresa;

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export default api;

export const IAapi = axios.create({
	baseURL: `http://${process.env.EXPO_PUBLIC_IP}:9001`,
});
