import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeContextData = {
	dark: boolean;
	toggleTheme: () => void;
	colors: {
		background: string;
		texto: string;
		header: string;
		tabBar: string;
		iconeAtivo: string;
		iconeInativo: string;
	};
};

const lightColors = {
	background: "#FFF8E1",
	texto: "#0A192F",
	header: "#F59E0B",
	tabBar: "#FFF3C4",
	iconeAtivo: "#FBBF24",
	iconeInativo: "#93A4C0",
};

const darkColors = {
	background: "#0A192F",
	texto: "#FFFFFF",
	header: "#2563EB",
	tabBar: "#1E40AF",
	iconeAtivo: "#60A5FA",
	iconeInativo: "#93C5FD", 
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		(async () => {
			const valor = await AsyncStorage.getItem("@dark_theme");
			if (valor !== null) {
				setDark(valor === "1");
			}
		})();
	}, []);

	const toggleTheme = async () => {
		const newDark = !dark;
		setDark(newDark);
		await AsyncStorage.setItem("@dark_theme", newDark ? "1" : "0");
	};

	const colors = dark ? darkColors : lightColors;

	return (
		<ThemeContext.Provider value={{ dark, toggleTheme, colors }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
