import { StyleSheet } from "react-native";
import { Fonts } from "../../../types/Fonts";
import { ThemeContextData } from "../../Context/ThemeContext";

export const configuracoesStyles = (colors: ThemeContextData["colors"]) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: 20,
			backgroundColor: colors.background,
		},

		botao: {
			backgroundColor: colors.header,
			padding: 15,
			borderRadius: 10,
			marginBottom: 15,
			marginTop: 50,
		},

		botaoLogout: {
			backgroundColor: "#B00020",
			padding: 15,
			borderRadius: 10,
			marginTop: 275
		},

		textoBotao: {
			color: "#fff",
			fontFamily: Fonts.Inter.Bold,
			fontSize: 16,
			textAlign: "center",
		},

		equipeContainer: {
			marginTop: 20,
		},

		tituloEquipe: {
			fontSize: 20,
			fontFamily: Fonts.Inter.Bold,
			color: colors.texto,
			marginBottom: 20,
			textAlign: "center",
		},

		linha: {
			flexDirection: "row",
			justifyContent: "space-between",
		},

		coluna: {
			width: "30%",
			alignItems: "center",
		},

		avatar: {
			width: 80,
			height: 80,
			borderRadius: 15,
			marginBottom: 8,
		},

		nome: {
			fontSize: 13,
			fontFamily: Fonts.Inter.SemiBold,
			color: colors.texto,
			textAlign: "center",
		},

		rm: {
			fontSize: 11,
			color: colors.iconeInativo,
			fontFamily: Fonts.Inter.Regular,
			textAlign: "center",
		},
	});
