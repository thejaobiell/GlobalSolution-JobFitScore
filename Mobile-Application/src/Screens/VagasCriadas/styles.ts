import { StyleSheet } from "react-native";
import { ThemeContextData } from "../../Context/ThemeContext";
import { Fonts } from "../../../types/Fonts";

export const VagasCriadasStyles = (colors: ThemeContextData["colors"]) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: 20,
			backgroundColor: colors.background,
		},

		loadingContainer: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: colors.background,
		},

		titulo: {
			fontSize: 22,
			fontFamily: Fonts.Inter.Bold,
			color: colors.texto,
			marginBottom: 20,
		},

		cardVazio: {
			backgroundColor: colors.tabBar,
			padding: 20,
			borderRadius: 12,
		},
		textoVazio: {
			color: colors.texto,
			fontSize: 16,
			fontFamily: Fonts.Inter.Medium,
			textAlign: "center",
		},

		cardLista: {
			backgroundColor: colors.tabBar,
			borderRadius: 12,
			padding: 10,
		},

		vagaItem: {
			padding: 15,
			borderBottomWidth: 1,
			borderBottomColor: colors.iconeInativo,
		},

		vagaTitulo: {
			fontSize: 18,
			fontFamily: Fonts.Inter.Bold,
			color: colors.texto,
			marginBottom: 6,
		},

		vagaId: {
			fontSize: 14,
			fontFamily: Fonts.Inter.Medium,
			color: colors.iconeAtivo,
			marginBottom: 10,
		},

		botoesLinha: {
			flexDirection: "row",
			gap: 10,
			marginTop: 10,
		},

		botaoEditar: {
			backgroundColor: "green",
			paddingVertical: 8,
			paddingHorizontal: 15,
			borderRadius: 8,
		},
		textoBotaoEditar: {
			color: colors.texto,
			fontFamily: Fonts.Inter.Bold,
		},

		botaoExcluir: {
			backgroundColor: "red",
			paddingVertical: 8,
			paddingHorizontal: 15,
			borderRadius: 8,
		},
		textoBotaoExcluir: {
			color: colors.texto,
			fontFamily: Fonts.Inter.Bold,
		},
	});
