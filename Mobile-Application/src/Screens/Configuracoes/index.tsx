import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Telas } from "../../../types/Telas";

import { useTheme } from "../../Context/ThemeContext";
import { useAuthUsuario } from "../../Context/UsuarioAuthContext";
import { useAuthEmpresa } from "../../Context/EmpresaAuthContext";

import { configuracoesStyles } from "./styles";

type Props = NativeStackScreenProps<Telas, "Configuracoes">;

export default function Configuracoes({ navigation }: Props) {
	const { colors, toggleTheme } = useTheme();
	const { signOut: signOutUsuario } = useAuthUsuario();
	const { signOut: signOutEmpresa } = useAuthEmpresa();
	const styles = configuracoesStyles(colors);

	const realizarLogout = () => {
		signOutUsuario(true);
		signOutEmpresa(true);
	};

	return (
		<View style={styles.container}>
			<View style={styles.equipeContainer}>
				<Text style={styles.tituloEquipe}>
					Equipe de Desenvolvimento
				</Text>

				<View style={styles.linha}>
					<View style={styles.coluna}>
						<Image
							source={{
								uri: "https://github.com/thejaobiell.png",
							}}
							style={styles.avatar}
						/>
						<Text style={styles.nome}>João Gabriel Boaventura</Text>
						<Text style={styles.rm}>RM554874 • 2TDSB2025</Text>
					</View>

					<View style={styles.coluna}>
						<Image
							source={{
								uri: "https://avatars.githubusercontent.com/u/168213489?v=4",
							}}
							style={styles.avatar}
						/>
						<Text style={styles.nome}>Leo Mota Lima</Text>
						<Text style={styles.rm}>RM557851 • 2TDSB2025</Text>
					</View>

					<View style={styles.coluna}>
						<Image
							source={{ uri: "https://github.com/LucasLDC.png" }}
							style={styles.avatar}
						/>
						<Text style={styles.nome}>Lucas Leal das Chagas</Text>
						<Text style={styles.rm}>RM551124 • 2TDSB2025</Text>
					</View>
				</View>
			</View>

			<TouchableOpacity style={styles.botao} onPress={toggleTheme}>
				<Text style={styles.textoBotao}>Alternar Tema</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.botaoLogout}
				onPress={realizarLogout}>
				<Text style={styles.textoBotao}>Sair da Conta</Text>
			</TouchableOpacity>
		</View>
	);
}
