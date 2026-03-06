import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import Perfil from "../Screens/Perfil";
import Vagas from "../Screens/Vagas";
import Configuracoes from "../Screens/Configuracoes";

import { Telas } from "../../types/Telas";
import { useTheme } from "../Context/ThemeContext";
import { useAuthEmpresa } from "../Context/EmpresaAuthContext";
import VagasCriadas from "../Screens/VagasCriadas";

const Tab = createBottomTabNavigator<Telas>();

export default function BottomTabs() {
	const { colors } = useTheme();
	const { empresa } = useAuthEmpresa();

	const Icon =
		(name: keyof typeof Feather.glyphMap) =>
		({ color, size }: { color: string; size: number }) =>
			<Feather name={name} size={size} color={color} />;

	return (
		<Tab.Navigator
			initialRouteName="Perfil"
			screenOptions={{
				headerShown: true,
				headerStyle: {
					backgroundColor: colors.header,
				},
				tabBarActiveTintColor: colors.iconeAtivo,
				tabBarInactiveTintColor: colors.iconeInativo,
				tabBarStyle: {
					height: 90,
					backgroundColor: colors.tabBar,
				},
				tabBarLabelStyle: {
					fontSize: 12,
				},
			}}>
			<Tab.Screen
				name="Perfil"
				component={Perfil}
				options={{
					title: "Perfil",
					tabBarIcon: Icon("user"),
				}}
			/>

			{!empresa && (
				<Tab.Screen
					name="Vagas"
					component={Vagas}
					options={{
						title: "Vagas",
						tabBarIcon: Icon("briefcase"),
					}}
				/>
			)}

			{empresa && (
				<Tab.Screen
					name="VagasCriadas"
					component={VagasCriadas}
					options={{
						tabBarIcon: Icon("briefcase"),
					}}
				/>
			)}

			<Tab.Screen
				name="Configuracoes"
				component={Configuracoes}
				options={{
					title: "Configurações",
					tabBarIcon: Icon("settings"),
				}}
			/>
		</Tab.Navigator>
	);
}
