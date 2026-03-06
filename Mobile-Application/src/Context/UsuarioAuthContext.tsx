import React, {
	createContext,
	useState,
	useEffect,
	ReactNode,
	useContext,
} from "react";
import {
	getJWTUsuario,
	setJWTUsuario,
	getUsuario,
	setUsuario,
	clearAllUsuario,
	setRefreshTokenUsuario,
} from "../../types/UsuarioAuthStorage";
import { buscarUsuarioPorEmail, login } from "../../types/Endpoints";
import { Usuario } from "../../types/Tabelas";
import { Alert } from "react-native";

type AuthContextData = {
	user?: Usuario;
	token?: string;
	loading: boolean;
	signIn: (email: string, senha: string) => Promise<void>;
	signOut: (voluntario?: boolean) => Promise<void>;
};

export const AuthContext = createContext<AuthContextData>(
	{} as AuthContextData
);

export const UsuarioAuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<Usuario | undefined>(undefined);
	const [token, setToken] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function carregarAsyncStorage() {
			const jwt = await getJWTUsuario();
			const user = await getUsuario();

			if (jwt && user) {
				setToken(jwt);
				setUser(user);
			}
			setLoading(false);
		}

		carregarAsyncStorage();
	}, []);

	/* Função para o login
	1- Usa o endpoint 'login' para obter o JWT e o refreshToken.
	2- Salva o JWT no AsyncStorage e no estado (useState) para que o interceptor possa enviar o token nas próximas requisições.
	3- Usa o email para buscar as informações completas do usuário com o endpoint 'buscarFuncionarioPorEmail'.
	4- Salva os dados do usuário no estado (useState) e no AsyncStorage para persistência da sessão.
	5- Salva também o refreshToken no AsyncStorage. */
	const signIn = async (email: string, senha: string) => {
		try {
			const resposta = await login(email, senha);
			const { tokenAcesso: JWT, refreshToken } = resposta.data;

			setToken(JWT);
			await setJWTUsuario(JWT);
			await setRefreshTokenUsuario(refreshToken);

			const dadosUsuario: Usuario = (await buscarUsuarioPorEmail(email))
				.data;

			setUser(dadosUsuario);
			await setUsuario(dadosUsuario);
		} catch (erro: any) {
			console.log("deu erro no Login:", erro.message);
			throw erro;
		}
	};

	/*Função para logout
		1- LIMPA o asyncStorage.
		2- coloca o setUser e setToken (que são usados universalmente no app) como nulos.
		3- CASO o logout for involuntário, ele informa que a sessão expirou.
	*/
	const signOut = async (voluntario = true) => {
		await clearAllUsuario();
		setUser(undefined);
		setToken(undefined);

		if (!voluntario) {
			Alert.alert(
				"Sessão expirada",
				"Sua sessão expirou. Faça login novamente."
			);
		}
	};

	return (
		<AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthUsuario = () => useContext(AuthContext);
