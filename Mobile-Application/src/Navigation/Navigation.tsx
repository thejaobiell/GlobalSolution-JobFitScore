import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Telas } from "../../types/Telas";

import BoasVindas from "../Screens/BoasVindas";
import Login from "../Screens/Login";
import Cadastro from "../Screens/Cadastro";
import BottomTabs from "./BottomTabs";
import PerfilHabilidade from "../Screens/PerfilHabilidade";
import CriarVagas from "../Screens/CriarVagas";
import EditarVaga from "../Screens/EditarVaga";
import DetalhesVaga from "../Screens/DetalhesVaga";

import { useAuthUsuario } from "../Context/UsuarioAuthContext";
import { useAuthEmpresa } from "../Context/EmpresaAuthContext";
import { useTheme } from "../Context/ThemeContext";

const Stack = createNativeStackNavigator<Telas>();

export default function Navigation() {
	const { colors } = useTheme();
	const { user, loading: loadingUsuario } = useAuthUsuario();
	const { empresa, loading: loadingEmpresa } = useAuthEmpresa();
	
	const autenticado = !!user || !!empresa;

	if (loadingUsuario || loadingEmpresa) return null;

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={!autenticado ? "BoasVindas" : "BottomTabs"}
				screenOptions={{
					headerShown: false,
					headerStyle: {
						backgroundColor: colors.header,
					},
				}}>
				{!autenticado ? (
					<>
						<Stack.Screen
							name="BoasVindas"
							component={BoasVindas}
						/>
						<Stack.Screen name="Login" component={Login} />
						<Stack.Screen name="Cadastro" component={Cadastro} />
					</>
				) : (
					<>
						<Stack.Screen
							name="BottomTabs"
							component={BottomTabs}
						/>

						<Stack.Screen
							name="PerfilHabilidade"
							component={PerfilHabilidade}
							options={{
								headerShown: true,
								title: "",
							}}
						/>

						<Stack.Screen
							name="CriarVagas"
							component={CriarVagas}
							options={{
								headerShown: true,
								title: "",
							}}
						/>

						<Stack.Screen
							name="EditarVaga"
							component={EditarVaga}
							options={{
								headerShown: true,
								title: "",
							}}
						/>

						{user && (
							<Stack.Screen
								name="DetalhesVaga"
								component={DetalhesVaga}
								options={{
									headerShown: true,
									title: "Detalhes da Vaga",
								}}
							/>
						)}
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
