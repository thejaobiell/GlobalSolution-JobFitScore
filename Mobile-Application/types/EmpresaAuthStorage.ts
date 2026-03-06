import AsyncStorage from "@react-native-async-storage/async-storage";
import { Empresa } from "./Tabelas";

// Keys específicas para empresa
export const AUTH_TOKEN_KEY_EMPRESA = "@empresa_jwt";
export const REFRESH_TOKEN_KEY_EMPRESA = "@empresa_refreshToken";
export const REFRESH_EXP_KEY_EMPRESA = "@empresa_refresh_exp";
export const EMPRESA_KEY = "@empresa_logada";

// JWT
export const setJWTEmpresa = (token: string) =>
	AsyncStorage.setItem(AUTH_TOKEN_KEY_EMPRESA, token);

export const getJWTEmpresa = () => AsyncStorage.getItem(AUTH_TOKEN_KEY_EMPRESA);

export const limparJWTEmpresa = () =>
	AsyncStorage.removeItem(AUTH_TOKEN_KEY_EMPRESA);

// Refresh Token
export const setRefreshTokenEmpresa = (token: string) =>
	AsyncStorage.setItem(REFRESH_TOKEN_KEY_EMPRESA, token);

export const getRefreshTokenEmpresa = () =>
	AsyncStorage.getItem(REFRESH_TOKEN_KEY_EMPRESA);

export const clearRefreshTokenEmpresa = () =>
	AsyncStorage.removeItem(REFRESH_TOKEN_KEY_EMPRESA);

// Expiração
export const setRefreshExpEmpresa = (exp: string) =>
	AsyncStorage.setItem(REFRESH_EXP_KEY_EMPRESA, exp);

export const getRefreshExpEmpresa = () =>
	AsyncStorage.getItem(REFRESH_EXP_KEY_EMPRESA);

export const clearRefreshExpEmpresa = () =>
	AsyncStorage.removeItem(REFRESH_EXP_KEY_EMPRESA);

// Empresa
export const setEmpresa = (empresa: Empresa) =>
	AsyncStorage.setItem(EMPRESA_KEY, JSON.stringify(empresa));

export const getEmpresa = async (): Promise<Empresa | null> => {
	const raw = await AsyncStorage.getItem(EMPRESA_KEY);
	return raw ? JSON.parse(raw) : null;
};

export const clearEmpresa = () => AsyncStorage.removeItem(EMPRESA_KEY);

// Limpar tudo da empresa
export const clearAllEmpresa = async () => {
	await Promise.all([
		limparJWTEmpresa(),
		clearRefreshTokenEmpresa(),
		clearRefreshExpEmpresa(),
		clearEmpresa(),
	]);
	console.log("Dados da empresa foram limpos");
};
