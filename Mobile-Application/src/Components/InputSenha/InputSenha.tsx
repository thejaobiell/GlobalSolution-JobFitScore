import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { inputSenhaStyles } from "./styles";
import { useTheme } from "../../Context/ThemeContext";

type Props = {
	label?: string;
	placeholder?: string;
	value: string;
	onChangeText: (text: string) => void;
};

export default function InputSenha({
	placeholder = "Senha",
	value,
	onChangeText,
}: Props) {
	const [show, setShow] = useState(false);
	const { colors } = useTheme();
	const styles = inputSenhaStyles(colors);

	return (
		<View style={styles.inputGroup}>

			<View style={styles.inputContainer}>
				<Feather name="lock" size={20} style={styles.inputIcon} />

				<TextInput
					style={[styles.textInput, { flex: 1, color: colors.texto }]}
					placeholder={placeholder}
					placeholderTextColor={colors.iconeInativo}
					secureTextEntry={!show}
					value={value}
					onChangeText={onChangeText}
				/>

				<TouchableOpacity
					onPress={() => setShow(!show)}
					style={styles.eyeButton}>
					<Feather
						name={show ? "eye" : "eye-off"}
						size={20}
						color={colors.iconeInativo}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}
