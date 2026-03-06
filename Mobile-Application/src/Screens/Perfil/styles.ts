import { StyleSheet } from "react-native";
import { ThemeContextData } from "../../Context/ThemeContext";
import { Fonts } from "../../../types/Fonts";

export const perfilStyles = (colors: ThemeContextData["colors"]) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.background,
		},
		header: {
			alignItems: "center",
			paddingVertical: 40,
			paddingHorizontal: 20,
		},
		avatar: {
			width: 100,
			height: 100,
			borderRadius: 50,
			backgroundColor: colors.header,
			alignItems: "center",
			justifyContent: "center",
			marginBottom: 16,
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 0.1,
			shadowRadius: 8,
			elevation: 5,
		},
		avatarTexto: {
			fontSize: 36,
			fontFamily: Fonts.Inter.Bold,
			color: "white",
		},
		titulo: {
			fontSize: 26,
			fontFamily: Fonts.Inter.Bold,
			color: colors.texto,
			marginBottom: 8,
			textAlign: "center",
		},
		badge: {
			backgroundColor: colors.header,
			paddingHorizontal: 16,
			paddingVertical: 6,
			borderRadius: 20,
			marginTop: 4,
		},
		badgeTexto: {
			fontSize: 13,
			fontFamily: Fonts.Inter.Medium,
			color: "white",
			textTransform: "uppercase",
			letterSpacing: 0.5,
		},
		card: {
			marginHorizontal: 20,
			marginBottom: 30,
			padding: 24,
			borderRadius: 16,
			backgroundColor: colors.tabBar,
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.08,
			shadowRadius: 12,
			elevation: 3,
		},
		cardTitulo: {
			fontSize: 18,
			fontFamily: Fonts.Inter.Bold,
			color: colors.texto,
			marginBottom: 20,
		},
		infoItem: {
			paddingVertical: 12,
		},
		label: {
			fontSize: 13,
			fontFamily: Fonts.Inter.Medium,
			color: colors.iconeAtivo,
			marginBottom: 6,
			textTransform: "uppercase",
			letterSpacing: 0.5,
		},
		valor: {
			fontSize: 17,
			fontFamily: Fonts.Inter.Bold,
			color: colors.texto,
		},
		divisor: {
			height: 1,
			backgroundColor: colors.background,
			marginVertical: 4,
			opacity: 0.5,
		},
		botao: {
			padding: 15,
			borderRadius: 10,
			alignItems: "center",
			backgroundColor: colors.iconeAtivo,
			marginBottom: 20,
		},
		botaoTexto: {
			color: "white",
			fontSize: 16,
			fontFamily: Fonts.Inter.Bold,
		},
	});
