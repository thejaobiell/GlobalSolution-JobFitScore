import React, {
	createContext,
	useState,
	useEffect,
	ReactNode,
	useContext,
} from "react";

import {
	getJWTEmpresa,
	setJWTEmpresa,
	getEmpresa,
	setEmpresa,
	clearAllEmpresa,
	setRefreshTokenEmpresa,
} from "../../types/EmpresaAuthStorage";

import { login, buscarEmpresaPorEmail } from "../../types/Endpoints";
import { Empresa } from "../../types/Tabelas";
import { Alert } from "react-native";

type AuthEmpresaContextData = {
	empresa?: Empresa;
	token?: string;
	loading: boolean;
	signIn: (email: string, senha: string) => Promise<void>;
	signOut: (voluntario?: boolean) => Promise<void>;
};

export const AuthEmpresaContext = createContext<AuthEmpresaContextData>(
	{} as AuthEmpresaContextData
);

export const EmpresaAuthProvider = ({ children }: { children: ReactNode }) => {
	const [empresa, setEmpresaState] = useState<Empresa | undefined>(undefined);
	const [token, setToken] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function carregarAsyncStorage() {
			const jwt = await getJWTEmpresa();
			const empresa = await getEmpresa();

			if (jwt && empresa) {
				setToken(jwt);
				setEmpresaState(empresa);
			}
			setLoading(false);
		}

		carregarAsyncStorage();
	}, []);

	const signIn = async (email: string, senha: string) => {
		try {
			const resposta = await login(email, senha);
			const { tokenAcesso: JWT, refreshToken } = resposta.data;

			setToken(JWT);
			await setJWTEmpresa(JWT);
			await setRefreshTokenEmpresa(refreshToken);

			const dadosEmpresa: Empresa = (await buscarEmpresaPorEmail(email))
				.data;

			setEmpresaState(dadosEmpresa);
			await setEmpresa(dadosEmpresa);
		} catch (erro: any) {
			console.log("erro login empresa:", erro.message);
			throw erro;
		}
	};

	const signOut = async (voluntario = true) => {
		await clearAllEmpresa();
		setEmpresaState(undefined);
		setToken(undefined);

		if (!voluntario) {
			Alert.alert(
				"Sessão expirada",
				"Sua sessão expirou. Faça login novamente."
			);
		}
	};

	return (
		<AuthEmpresaContext.Provider
			value={{ empresa, token, loading, signIn, signOut }}>
			{children}
		</AuthEmpresaContext.Provider>
	);
};

export const useAuthEmpresa = () => useContext(AuthEmpresaContext);
