import { StyleSheet } from "react-native";
import { ThemeContextData } from "../../Context/ThemeContext";
import { Fonts } from "../../../types/Fonts";

export const perfilHabilidadeStyles = (colors: ThemeContextData["colors"]) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background,
		},
		loadingContainer: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: colors.background,
		},
		textoLoading: {
			marginTop: 12,
			fontSize: 16,
			fontFamily: Fonts.Inter.Medium,
			color: colors.texto,
		},
		textoError: {
			fontSize: 16,
			fontFamily: Fonts.Inter.Medium,
			color: colors.texto,
			textAlign: "center",
		},
		section: {
			marginTop: 24,
			paddingHorizontal: 20,
		},
		tituloSection: {
			fontSize: 24,
			fontFamily: Fonts.Inter.Bold,
			color: colors.texto,
			marginBottom: 4,
		},
		subtituloSection: {
			fontSize: 14,
			fontFamily: Fonts.Inter.Medium,
			color: colors.header,
			marginBottom: 16,
		},
		card: {
			backgroundColor: colors.tabBar,
			borderRadius: 16,
			padding: 16,
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.08,
			shadowRadius: 12,
			elevation: 3,
		},
		cardVazio: {
			backgroundColor: colors.tabBar,
			borderRadius: 16,
			padding: 32,
			alignItems: "center",
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.08,
			shadowRadius: 12,
			elevation: 3,
		},
		textoVazio: {
			fontSize: 15,
			fontFamily: Fonts.Inter.Medium,
			color: colors.header,
			textAlign: "center",
			lineHeight: 22,
		},
		habilidadeItem: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			paddingVertical: 12,
		},
		habilidadeInfo: {
			flexDirection: "row",
			alignItems: "center",
			flex: 1,
		},
		badge: {
			width: 28,
			height: 28,
			borderRadius: 14,
			backgroundColor: colors.header,
			alignItems: "center",
			justifyContent: "center",
			marginRight: 12,
		},
		textoBadge: {
			fontSize: 14,
			color: "white",
			fontFamily: Fonts.Inter.Bold,
		},
		habilidadeNome: {
			fontSize: 16,
			fontFamily: Fonts.Inter.Medium,
			color: colors.texto,
			flex: 1,
		},
		botaoAdicionar: {
			backgroundColor: colors.header,
			paddingHorizontal: 16,
			paddingVertical: 8,
			borderRadius: 8,
		},
		botaoAdicionarTexto: {
			fontSize: 14,
			fontFamily: Fonts.Inter.Bold,
			color: "white",
		},
		botaoRemover: {
			backgroundColor: "transparent",
			borderWidth: 1.5,
			borderColor: "#dc2626",
			paddingHorizontal: 16,
			paddingVertical: 8,
			borderRadius: 8,
		},
		textoBotaoRemover: {
			fontSize: 14,
			fontFamily: Fonts.Inter.Bold,
			color: "#dc2626",
		},
		divisor: {
			height: 1,
			backgroundColor: colors.background,
			marginVertical: 4,
			opacity: 0.5,
		},
		input:{
			height: 48,
			backgroundColor: colors.tabBar,
			borderRadius: 12,
			paddingHorizontal: 16,
			fontSize: 16,
			fontFamily: Fonts.Inter.Medium,
			color: colors.texto,
			marginBottom: 16,
		}
	});
