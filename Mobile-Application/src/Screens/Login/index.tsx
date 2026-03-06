import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Telas } from "../../../types/Telas";
import { useTheme } from "../../Context/ThemeContext";
import { loginStyles } from "./styles";
import { useAuthUsuario } from "../../Context/UsuarioAuthContext";
import { useAuthEmpresa } from "../../Context/EmpresaAuthContext";
import InputSenha from "../../Components/InputSenha/InputSenha";

type Props = NativeStackScreenProps<Telas, "Login">;

export default function Login({ navigation }: Props) {
	const { colors } = useTheme();
	const styles = loginStyles(colors);

	const { signIn: signInUsuario } = useAuthUsuario();
	const { signIn: signInEmpresa } = useAuthEmpresa();

	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");

	const entrar = async () => {
		try {
			await signInUsuario(email, senha);
			navigation.replace("BottomTabs");
		} catch (eUsuario) {
			try {
				await signInEmpresa(email, senha);
				navigation.replace("BottomTabs");
			} catch (eEmpresa) {
				alert("Email ou senha incorretos.");
			}
		}
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}>
			<View style={styles.container}>
				<Text style={styles.titulo}>Login</Text>

				<TextInput
					style={styles.input}
					placeholder="E-mail"
					placeholderTextColor={colors.iconeInativo}
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					autoCapitalize="none"
				/>

				<InputSenha
					label="Senha"
					value={senha}
					onChangeText={setSenha}
				/>

				<TouchableOpacity
					style={[styles.botao, { backgroundColor: colors.header }]}
					onPress={entrar}>
					<Text style={styles.botaoTexto}>Entrar</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => navigation.navigate("Cadastro")}>
					<Text style={styles.cadastrarTexto}>Não tenho conta</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}
