import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Telas } from "../../../types/Telas";
import { useTheme } from "../../Context/ThemeContext";
import InputSenha from "../../Components/InputSenha/InputSenha";
import { cadastroStyles } from "./styles";
import {
	cadastrarUsuario,
	cadastrarEmpresa,
	login,
} from "../../../types/Endpoints";
import { useAuthUsuario } from "../../Context/UsuarioAuthContext";
import { useAuthEmpresa } from "../../Context/EmpresaAuthContext";

type Props = NativeStackScreenProps<Telas, "Cadastro">;

export default function Cadastro({ navigation }: Props) {
	const { colors } = useTheme();
	const styles = cadastroStyles(colors);

	const { signIn: signInUsuario } = useAuthUsuario();
	const { signIn: signInEmpresa } = useAuthEmpresa();

	const [tipo, setTipo] = useState<"usuario" | "empresa">("usuario");
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [confirmarSenha, setConfirmarSenha] = useState("");
	const [cnpj, setCnpj] = useState("");

	const validar = () => {
		if (!nome || !email || !senha || !confirmarSenha) {
			alert("Preencha todos os campos.");
			return false;
		}

		if (senha !== confirmarSenha) {
			alert("As senhas não coincidem.");
			return false;
		}

		if (tipo === "empresa" && !cnpj) {
			alert("Informe o CNPJ.");
			return false;
		}

		return true;
	};

	const cadastrar = async () => {
		if (!validar()) return;

		try {
			if (tipo === "usuario") {
				await cadastrarUsuario({ nome, email, senha });
				await signInUsuario(email, senha);
			} else {
				await cadastrarEmpresa({ nome, cnpj, email, senha });
				await signInEmpresa(email, senha);
			}
		} catch (e: any) {
			alert("Erro ao cadastrar: " + e.message);
		}
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}>
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.titulo}>Criar Conta</Text>

				<View style={styles.radioContainer}>
					<TouchableOpacity
						style={styles.radioItem}
						onPress={() => setTipo("usuario")}>
						<View
							style={[
								styles.radio,
								tipo === "usuario" && styles.radioAtivo,
							]}
						/>
						<Text style={styles.radioTexto}>Sou Candidato</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.radioItem}
						onPress={() => setTipo("empresa")}>
						<View
							style={[
								styles.radio,
								tipo === "empresa" && styles.radioAtivo,
							]}
						/>
						<Text style={styles.radioTexto}>Sou Empresa</Text>
					</TouchableOpacity>
				</View>

				<TextInput
					style={styles.input}
					placeholder={
						tipo === "empresa" ? "Nome da empresa" : "Nome completo"
					}
					placeholderTextColor={colors.iconeInativo}
					value={nome}
					onChangeText={setNome}
				/>

				{tipo === "empresa" && (
					<TextInput
						style={styles.input}
						placeholder="CNPJ"
						placeholderTextColor={colors.iconeInativo}
						keyboardType="numeric"
						value={cnpj}
						onChangeText={setCnpj}
						maxLength={14}
					/>
				)}

				<TextInput
					style={styles.input}
					placeholder="E-mail"
					placeholderTextColor={colors.iconeInativo}
					value={email}
					onChangeText={setEmail}
					autoCapitalize="none"
					keyboardType="email-address"
				/>

				<InputSenha
					label="Senha"
					value={senha}
					onChangeText={setSenha}
				/>

				<InputSenha
					label="Confirmar Senha"
					value={confirmarSenha}
					onChangeText={setConfirmarSenha}
					placeholder="Confirmar Senha"
				/>

				<TouchableOpacity
					style={[styles.botao, { backgroundColor: colors.header }]}
					onPress={cadastrar}>
					<Text style={styles.botaoTexto}>Cadastrar</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<Text style={styles.voltarLogin}>Já tenho uma conta</Text>
				</TouchableOpacity>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
