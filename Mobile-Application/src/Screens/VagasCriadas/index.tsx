import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
	RefreshControl,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Telas } from "../../../types/Telas";
import { useTheme } from "../../Context/ThemeContext";
import { useAuthEmpresa } from "../../Context/EmpresaAuthContext";
import { buscarVagaPorEmpresa, deletarVaga } from "../../../types/Endpoints";
import { VagasCriadasStyles } from "./styles";
import { Vaga } from "../../../types/Tabelas";

type Props = NativeStackScreenProps<Telas, "VagasCriadas">;

export default function VagasCriadas({ navigation }: Props) {
	const { colors } = useTheme();
	const styles = VagasCriadasStyles(colors);
	const { empresa } = useAuthEmpresa();
	const [vagas, setVagas] = useState<Vaga[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const carregar = async () => {
		if (!empresa) return;
		try {
			setLoading(true);
			const resp = await buscarVagaPorEmpresa(empresa.id_empresa);
			setVagas(resp.data.content || resp.data);
		} catch (e: any) {
			Alert.alert("Erro", e.response?.data || e.message);
		} finally {
			setLoading(false);
		}
	};

	const onRefresh = async () => {
		if (!empresa) return;
		try {
			setRefreshing(true);
			const resp = await buscarVagaPorEmpresa(empresa.id_empresa);
			setVagas(resp.data.content || resp.data);
		} catch (e: any) {
			Alert.alert("Erro", e.response?.data || e.message);
		} finally {
			setRefreshing(false);
		}
	};

	useEffect(() => {
		carregar();
	}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			carregar();
		});
		return unsubscribe;
	}, [navigation]);

	const excluir = (id: number) => {
		Alert.alert("Confirmar", "Deseja realmente excluir esta vaga?", [
			{ text: "Cancelar", style: "cancel" },
			{
				text: "Excluir",
				style: "destructive",
				onPress: async () => {
					try {
						await deletarVaga(id);
						await carregar();
					} catch (e: any) {
						Alert.alert("Erro", e.response?.data || e.message);
					}
				},
			},
		]);
	};

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={colors.header} />
			</View>
		);
	}

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{ paddingBottom: 40 }}
			showsVerticalScrollIndicator={false}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
					colors={[colors.header]}
					tintColor={colors.header}
				/>
			}>
			<Text style={styles.titulo}>Vagas Criadas</Text>
			{vagas.length === 0 ? (
				<View style={styles.cardVazio}>
					<Text style={styles.textoVazio}>
						Você ainda não criou nenhuma vaga.
					</Text>
				</View>
			) : (
				<View style={styles.cardLista}>
					{vagas.map((vaga) => (
						<View key={vaga.id} style={styles.vagaItem}>
							<Text style={styles.vagaTitulo}>{vaga.titulo}</Text>
							<Text style={styles.vagaId}>ID: {vaga.id}</Text>
							<View style={styles.botoesLinha}>
								<TouchableOpacity
									style={styles.botaoEditar}
									onPress={() =>
										navigation.navigate("EditarVaga", {
											vagaId: vaga.id,
										})
									}>
									<Text style={styles.textoBotaoEditar}>
										Editar
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.botaoExcluir}
									onPress={() => excluir(vaga.id)}>
									<Text style={styles.textoBotaoExcluir}>
										Excluir
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					))}
				</View>
			)}
		</ScrollView>
	);
}
