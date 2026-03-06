import { StyleSheet } from "react-native";
import { ThemeContextData } from "../../Context/ThemeContext";
import { Fonts } from "../../../types/Fonts";

export const loginStyles = (colors: ThemeContextData["colors"]) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: 20,
			justifyContent: "center",
			backgroundColor: colors.background,
		},
		titulo: {
			fontSize: 42,
			fontFamily: Fonts.Inter.Bold,
			marginBottom: 30,
			color: "#F59E0B",
			textAlign: "center",
		},
		input: {
			width: "100%",
			height: 50,
			borderWidth: 1,
			borderColor: colors.iconeInativo,
			borderRadius: 10,
			paddingHorizontal: 15,
			marginBottom: 15,
			fontFamily: Fonts.Inter.Regular,
			color: colors.texto,
			fontSize: 16,
		},
		botao: {
			width: "100%",
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
		cadastrarTexto: {
			textAlign: "center",
			marginTop: 20,
			fontSize: 14,
			color: colors.header,
			fontFamily: Fonts.Inter.Medium,
		},
	});
