import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from "./Tabelas";

export const USUARIO_JWT_KEY = "@usuario_jwt";
export const USUARIO_REFRESH_TOKEN_KEY = "@usuario_refreshToken";
export const USUARIO_REFRESH_EXP_KEY = "@usuario_refresh_exp";
export const USUARIO_DATA_KEY = "@usuario_logado";

// JWT
export const setJWTUsuario = (token: string) =>
	AsyncStorage.setItem(USUARIO_JWT_KEY, token);

export const getJWTUsuario = () => AsyncStorage.getItem(USUARIO_JWT_KEY);

export const limparJWTUsuario = () => AsyncStorage.removeItem(USUARIO_JWT_KEY);

// Refresh Token
export const setRefreshTokenUsuario = (token: string) =>
	AsyncStorage.setItem(USUARIO_REFRESH_TOKEN_KEY, token);

export const getRefreshTokenUsuario = () =>
	AsyncStorage.getItem(USUARIO_REFRESH_TOKEN_KEY);

export const clearRefreshTokenUsuario = () =>
	AsyncStorage.removeItem(USUARIO_REFRESH_TOKEN_KEY);

// Expiração
export const setRefreshExpUsuario = (exp: string) =>
	AsyncStorage.setItem(USUARIO_REFRESH_EXP_KEY, exp);

export const getRefreshExpUsuario = () =>
	AsyncStorage.getItem(USUARIO_REFRESH_EXP_KEY);

export const clearRefreshExpUsuario = () =>
	AsyncStorage.removeItem(USUARIO_REFRESH_EXP_KEY);

// Usuário
export const setUsuario = (user: Usuario) =>
	AsyncStorage.setItem(USUARIO_DATA_KEY, JSON.stringify(user));

export const getUsuario = async (): Promise<Usuario | null> => {
	const raw = await AsyncStorage.getItem(USUARIO_DATA_KEY);
	return raw ? JSON.parse(raw) : null;
};

export const clearUsuario = () => AsyncStorage.removeItem(USUARIO_DATA_KEY);

// Limpar tudo (usuário)
export const clearAllUsuario = async () => {
	await Promise.all([
		limparJWTUsuario(),
		clearRefreshTokenUsuario(),
		clearRefreshExpUsuario(),
		clearUsuario(),
	]);
	console.log("Todos os dados do usuário foram limpos");
};
