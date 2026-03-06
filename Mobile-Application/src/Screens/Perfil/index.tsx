import React from "react";
import { View, Text, ScrollView, Button, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Telas } from "../../../types/Telas";
import { useAuthUsuario } from "../../Context/UsuarioAuthContext";
import { useAuthEmpresa } from "../../Context/EmpresaAuthContext";
import { useTheme } from "../../Context/ThemeContext";
import { perfilStyles } from "./styles";

type Props = NativeStackScreenProps<Telas, "Perfil">;

export default function Perfil({ navigation }: Props) {
	const { user } = useAuthUsuario();
	const { empresa } = useAuthEmpresa();
	const { colors } = useTheme();
	const styles = perfilStyles(colors);

	const nome = user?.nome || empresa?.nome;
	const email = user?.email || empresa?.email;
	const tipo = user ? "Candidato" : empresa ? "Empresa" : "Desconhecido";

	const iniciais =
		nome
			?.split(" ")
			.slice(0, 2)
			.map((n) => n[0])
			.join("")
			.toUpperCase() || "?";

	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<View style={styles.avatar}>
					<Text style={styles.avatarTexto}>{iniciais}</Text>
				</View>
				<Text style={styles.titulo}>{nome}</Text>
				<View style={styles.badge}>
					<Text style={styles.badgeTexto}>{tipo}</Text>
				</View>
			</View>

			<View style={styles.card}>
				<Text style={styles.cardTitulo}>Informações Pessoais</Text>

				<View style={styles.infoItem}>
					<Text style={styles.label}>Nome completo</Text>
					<Text style={styles.valor}>{nome}</Text>
				</View>

				<View style={styles.divisor} />

				{empresa && empresa.cnpj && (
					<>
						<View style={styles.infoItem}>
							<Text style={styles.label}>CNPJ</Text>
							<Text style={styles.valor}>{empresa.cnpj}</Text>
						</View>
					</>
				)}

				<View style={styles.divisor} />

				<View style={styles.infoItem}>
					<Text style={styles.label}>E-mail</Text>
					<Text style={styles.valor}>{email}</Text>
				</View>

				<View style={styles.divisor} />

				<View style={styles.infoItem}>
					<Text style={styles.label}>Tipo de conta</Text>
					<Text style={styles.valor}>{tipo}</Text>
				</View>
			</View>

			{tipo === "Candidato" ? (
				<TouchableOpacity
					style={styles.botao}
					onPress={() => navigation.navigate("PerfilHabilidade")}>
					<Text style={styles.botaoTexto}>
						Adicionar/Editar Habilidades
					</Text>
				</TouchableOpacity>
			) : (
				<>
					<TouchableOpacity
						style={styles.botao}
						onPress={() => navigation.navigate("CriarVagas")}>
						<Text style={styles.botaoTexto}>
							Criar uma nova Vaga
						</Text>
					</TouchableOpacity>
				</>
			)}
		</ScrollView>
	);
}
