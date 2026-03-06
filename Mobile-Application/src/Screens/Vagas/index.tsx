import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	ActivityIndicator,
	RefreshControl,
} from "react-native";
import { useTheme } from "../../Context/ThemeContext";
import { listarVagas } from "../../../types/Endpoints";
import { vagasStyles } from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Telas } from "../../../types/Telas";

type Props = NativeStackScreenProps<Telas, "Vagas">;

interface Vaga {
	id: number;
	titulo: string;
	empresaId: number;
	nomeEmpresa: string;
}

export default function Vagas({ navigation }: Props) {
	const { colors } = useTheme();
	const styles = vagasStyles(colors);
	const [vagas, setVagas] = useState<Vaga[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const fetchVagas = async () => {
		try {
			setLoading(true);
			const res = await listarVagas();
			setVagas(res.data.content);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const onRefresh = async () => {
		try {
			setRefreshing(true);
			const res = await listarVagas();
			setVagas(res.data.content);
		} catch (error) {
			console.error(error);
		} finally {
			setRefreshing(false);
		}
	};

	useEffect(() => {
		fetchVagas();
	}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			fetchVagas();
		});
		return unsubscribe;
	}, [navigation]);

	if (loading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color={colors.iconeAtivo} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>Vagas Disponíveis</Text>
			<FlatList
				data={vagas}
				keyExtractor={(i) => i.id.toString()}
				renderItem={({ item }) => (
					<View style={styles.card}>
						<Text style={styles.cardTitulo}>{item.titulo}</Text>
						<Text style={styles.cardEmpresa}>
							{item.nomeEmpresa}
						</Text>
						<TouchableOpacity
							style={styles.botao}
							onPress={() =>
								navigation.navigate("DetalhesVaga", {
									vagaId: item.id,
								})
							}>
							<Text style={styles.botaoTexto}>Ver mais</Text>
						</TouchableOpacity>
					</View>
				)}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={[colors.iconeAtivo]}
						tintColor={colors.iconeAtivo}
					/>
				}
			/>
		</View>
	);
}
