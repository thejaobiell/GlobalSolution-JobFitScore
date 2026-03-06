import { StyleSheet } from "react-native";
import { ThemeContextData } from "../../Context/ThemeContext";

export const vagasStyles = (colors: ThemeContextData["colors"]) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: 20,
			backgroundColor: colors.background,
		},
		titulo: {
			fontSize: 28,
			fontFamily: "Inter-Bold",
			color: colors.texto,
			marginBottom: 20,
		},
		card: {
			padding: 15,
			marginBottom: 15,
			borderRadius: 12,
			backgroundColor: colors.header,
		},
		cardTitulo: {
			fontSize: 18,
			color: colors.texto,
			fontFamily: "Inter-SemiBold",
		},
		cardEmpresa: {
			fontSize: 14,
			color: colors.texto,
			marginTop: 4,
			fontFamily: "Inter-Regular",
		},
		cardSalario: {
			fontSize: 14,
			color: colors.header,
			marginTop: 4,
			fontFamily: "Inter-Medium",
		},
		botao: {
			marginTop: 10,
			padding: 10,
			borderRadius: 8,
			backgroundColor: colors.header,
			alignItems: "center",
		},
		botaoTexto: {
			color: "white",
			fontFamily: "Inter-SemiBold",
		},
	});
