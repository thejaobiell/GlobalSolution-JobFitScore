import { StyleSheet } from "react-native";
import { ThemeContextData } from "../../Context/ThemeContext";
import { Fonts } from "../../../types/Fonts";

export const editarVagasStyles = (colors: ThemeContextData["colors"]) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background,
			padding: 20,
		},

		section: {
			marginBottom: 25,
		},

		tituloSection: {
			fontSize: 18,
			fontFamily: Fonts.Inter.Bold,
			color: colors.texto,
			marginBottom: 10,
		},

		card: {
			backgroundColor: colors.tabBar,
			borderRadius: 10,
			padding: 15,
			borderWidth: 1,
			borderColor: colors.iconeInativo,
		},

		cardVazio: {
			backgroundColor: colors.tabBar,
			borderRadius: 10,
			padding: 20,
			alignItems: "center",
			borderWidth: 1,
			borderColor: colors.iconeInativo,
		},

		textoVazio: {
			fontSize: 14,
			fontFamily: Fonts.Inter.Medium,
			color: colors.texto,
			textAlign: "center",
		},

		input: {
			width: "100%",
			height: 48,
			borderWidth: 1,
			borderColor: colors.iconeInativo,
			borderRadius: 8,
			paddingHorizontal: 12,
			marginBottom: 16,
			fontFamily: Fonts.Inter.Regular,
			color: colors.texto,
			backgroundColor: colors.background,
		},

		habilidadeItem: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			paddingVertical: 10,
			borderBottomWidth: 1,
			borderColor: colors.iconeInativo,
		},

		habilidadeNome: {
			fontSize: 16,
			fontFamily: Fonts.Inter.Medium,
			color: colors.texto,
			flex: 1,
		},

		botaoRemover: {
			backgroundColor: "#D9534F",
			paddingVertical: 6,
			paddingHorizontal: 12,
			borderRadius: 6,
		},

		textoBotaoRemover: {
			color: "#fff",
			fontFamily: Fonts.Inter.Bold,
		},

		botaoAdicionar: {
			backgroundColor: colors.header,
			paddingVertical: 6,
			paddingHorizontal: 12,
			borderRadius: 6,
		},

		botaoAdicionarTexto: {
			fontFamily: Fonts.Inter.Bold,
			color: colors.texto,
		},

		botaoPrincipal: {
			backgroundColor: colors.header,
			paddingVertical: 14,
			borderRadius: 10,
			alignItems: "center",
			justifyContent: "center",
			marginTop: 10,
		},

		botaoPrincipalTexto: {
			fontFamily: Fonts.Inter.Bold,
			fontSize: 16,
			color: colors.texto,
		},
	});
