import { StyleSheet } from "react-native";
import { ThemeContextData } from "../../Context/ThemeContext";
import { Fonts } from "../../../types/Fonts";

export const cadastroStyles = (colors: ThemeContextData["colors"]) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: 20,
			backgroundColor: colors.background,
		},

		titulo: {
			fontSize: 32,
			fontFamily: Fonts.Inter.Bold,
			color: colors.texto,
			marginBottom: 30,
            marginTop: 120,
			textAlign: "center",
		},

		input: {
			width: "100%",
			height: 50,
			borderWidth: 1,
			borderColor: colors.header,
			borderRadius: 10,
			paddingHorizontal: 15,
			marginBottom: 15,
			fontSize: 16,
			fontFamily: Fonts.Inter.Regular,
			color: colors.texto,
		},

		botao: {
			width: "100%",
			backgroundColor: colors.header,
			paddingVertical: 15,
			borderRadius: 10,
			alignItems: "center",
			marginTop: 10,
		},

		botaoTexto: {
			color: "#fff",
			fontSize: 16,
			fontFamily: Fonts.Inter.Bold,
		},

		voltarLogin: {
			marginTop: 20,
			fontSize: 15,
			color: colors.texto,
			fontFamily: Fonts.Inter.Medium,
			textAlign: "center",
		},

		radioContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginBottom: 20,
		},

		radioItem: {
			flexDirection: "row",
			alignItems: "center",
			gap: 8,
			paddingVertical: 6,
			paddingHorizontal: 8,
			borderRadius: 8,
		},

		radio: {
			width: 20,
			height: 20,
			borderRadius: 10,
			borderWidth: 2,
			borderColor: colors.texto,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: "transparent",
		},

		radioInner: {
			width: 10,
			height: 10,
			borderRadius: 5,
		},

		radioAtivo: {
			borderColor: colors.header,
            backgroundColor: colors.header,
		},

		radioInnerAtivo: {
			backgroundColor: colors.header,
		},

		radioTexto: {
			fontSize: 16,
			fontFamily: Fonts.Inter.Medium,
			color: colors.texto,
		},
	});
