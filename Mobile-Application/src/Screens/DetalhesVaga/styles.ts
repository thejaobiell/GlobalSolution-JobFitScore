import { StyleSheet } from "react-native";
import { ThemeContextData } from "../../Context/ThemeContext";
import { Fonts } from "../../../types/Fonts";

export const detalhesVagaStyles = (colors: ThemeContextData["colors"]) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background,
			padding: 20,
		},

		loadingContainer: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: colors.background,
		},

		titulo: {
			fontSize: 24,
			fontFamily: Fonts.Inter.Bold,
			color: colors.texto,
			marginBottom: 20,
		},

		card: {
			backgroundColor: colors.tabBar,
			padding: 16,
			borderRadius: 12,
			marginBottom: 20,
			borderWidth: 1,
			borderColor: colors.iconeInativo,
		},

		cardTitulo: {
			fontSize: 18,
			fontFamily: Fonts.Inter.Bold,
			color: colors.texto,
			marginBottom: 10,
		},

		descricao: {
			fontSize: 15,
			color: colors.texto,
			fontFamily: Fonts.Inter.Regular,
		},

		textoVazio: {
			fontSize: 15,
			fontFamily: Fonts.Inter.Medium,
			color: colors.iconeInativo,
		},

		habilidadeItem: {
			paddingVertical: 10,
			borderBottomWidth: 1,
			borderColor: colors.iconeInativo,
		},

		habilidadeNome: {
			fontSize: 16,
			fontFamily: Fonts.Inter.Medium,
			color: colors.texto,
		},

		botaoAcao: {
			backgroundColor: colors.header,
			paddingVertical: 14,
			borderRadius: 10,
			marginBottom: 15,
			alignItems: "center",
		},

		botaoAcaoTexto: {
			color: "#fff",
			fontSize: 16,
			fontFamily: Fonts.Inter.Bold,
		},
	});
