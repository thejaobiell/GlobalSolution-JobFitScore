import { StyleSheet } from "react-native";
import { Fonts } from "../../../types/Fonts";
import { ThemeContextData } from "../../Context/ThemeContext";

export const boasVindasStyles = (colors: ThemeContextData["colors"]) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			paddingHorizontal: 20,
			backgroundColor: colors.background,
		},
		logo: {
			width: 200,
			height: 200,
			marginBottom: 20,
			borderRadius: 20,
			resizeMode: "contain",
		},
		titulo: {
			fontSize: 22,
			fontFamily: Fonts.Inter.Bold,
			color: "white",
			textAlign: "center",
			marginBottom: 40,
		},
		botoesContainer: {
			width: "100%",
			gap: 15,
		},
		botao: {
			width: "100%",
			paddingVertical: 14,
			borderRadius: 10,
			alignItems: "center",
		},
		botaoTexto: {
			color: "#fff",
			fontSize: 16,
			fontFamily: Fonts.Inter.SemiBold,
		},
	});
