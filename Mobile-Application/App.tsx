import React from "react";
import { UsuarioAuthProvider } from "./src/Context/UsuarioAuthContext";
import { EmpresaAuthProvider } from "./src/Context/EmpresaAuthContext";
import { ThemeProvider } from "./src/Context/ThemeContext";
import Navigation from "./src/Navigation/Navigation";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

export default function App() {
	const [fontesCarregadas, setFontesCarregadas] = useState(false);

	useEffect(() => {
		async function loadFonts() {
			await Font.loadAsync({
				"Inter-Regular": require("./assets/fonts/Inter_18pt-Regular.ttf"),
				"Inter-Medium": require("./assets/fonts/Inter_18pt-Medium.ttf"),
				"Inter-SemiBold": require("./assets/fonts/Inter_18pt-SemiBold.ttf"),
				"Inter-Bold": require("./assets/fonts/Inter_18pt-Bold.ttf"),
			});
			setFontesCarregadas(true);
		}
		loadFonts();
	}, []);

	return (
		<ThemeProvider>
			<UsuarioAuthProvider>
				<EmpresaAuthProvider>
					<Navigation />
				</EmpresaAuthProvider>
			</UsuarioAuthProvider>
		</ThemeProvider>
	);
}
