import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Telas } from "../../../types/Telas";
import { useTheme } from "../../Context/ThemeContext";
import { boasVindasStyles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<Telas, "BoasVindas">;

export default function BoasVindas({ navigation }: Props) {
	const { colors } = useTheme();
	const styles = boasVindasStyles(colors);

	return (
		<LinearGradient
			colors={["blue", "#F59E0B"]}
			start={{ x: 0, y: 0.5 }}
			end={{ x: 1, y: 0.5 }}
			style={styles.container}>
			<Image
				source={require("../../../assets/logo.png")}
				style={styles.logo}
				resizeMode="contain"
			/>

			<Text style={styles.titulo}>Bem-vindo ao JobFit-Score</Text>

			<View style={styles.botoesContainer}>
				<TouchableOpacity
					style={[styles.botao, { backgroundColor: "#F59E0B" }]}
					onPress={() => navigation.navigate("Login")}>
					<Text style={styles.botaoTexto}>Login</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.botao, { backgroundColor: "#1E40AF" }]}
					onPress={() => navigation.navigate("Cadastro")}>
					<Text style={styles.botaoTexto}>Cadastrar</Text>
				</TouchableOpacity>
			</View>
		</LinearGradient>
	);
}
