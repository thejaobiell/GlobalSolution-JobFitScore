import { StyleSheet } from "react-native";
import { ThemeContextData } from "../../Context/ThemeContext";
import { Fonts } from "../../../types/Fonts";

export const inputSenhaStyles = (colors: ThemeContextData["colors"]) =>
	StyleSheet.create({
		inputGroup: {
			width: "100%",
			marginBottom: 15,
		},
		inputLabel: {
			fontSize: 14,
			marginBottom: 5,
			color: colors.texto,
			fontFamily: Fonts.Inter.Medium,
		},
		inputContainer: {
			flexDirection: "row",
			alignItems: "center",
			borderWidth: 1,
			borderColor: colors.iconeInativo,
			borderRadius: 10,
			paddingHorizontal: 10,
			backgroundColor: colors.background,
		},
		inputIcon: {
			marginRight: 10,
			color: colors.texto,
		},
		textInput: {
			height: 45,
			fontSize: 16,
			fontFamily: Fonts.Inter.Regular,
		},
		eyeButton: {
			padding: 5,
		},
	});
