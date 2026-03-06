import React, { useState, useEffect } from "react";
import {
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Alert,
	ActivityIndicator,
	View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Telas } from "../../../types/Telas";
import { useTheme } from "../../Context/ThemeContext";
import { useAuthEmpresa } from "../../Context/EmpresaAuthContext";

import {
	buscarVagaPorId,
	atualizarVaga,
	listarHabilidades,
	cadastrarHabilidade,
	cadastrarVagaHabilidade,
	deletarVagaHabilidade,
	buscarVagaHabilidadePorVaga,
} from "../../../types/Endpoints";

import { editarVagasStyles } from "./styles";

type Props = NativeStackScreenProps<Telas, "EditarVaga">;

export default function EditarVaga({ navigation, route }: Props) {
	const { vagaId } = route.params;

	const { colors } = useTheme();
	const { empresa } = useAuthEmpresa();
	const styles = editarVagasStyles(colors);

	const [titulo, setTitulo] = useState("");
	const [todas, setTodas] = useState<any[]>([]);
	const [minhas, setMinhas] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [loadingHabilidades, setLoadingHabilidades] = useState(false);
	const [novaHabilidade, setNovaHabilidade] = useState("");

	const vagaIdConvertido = Number(vagaId);

	useEffect(() => {
		carregar();
	}, []);

	const carregar = async () => {
		try {
			setLoadingHabilidades(true);

			const resp = await buscarVagaPorId(vagaIdConvertido);
			setTitulo(resp.data.titulo);

			const respHab = await listarHabilidades();
			setTodas(respHab.data.content || respHab.data);

			const respMinhas = await buscarVagaHabilidadePorVaga(vagaIdConvertido);

			setMinhas(
				respMinhas.data.map((h: any) => ({
					id: h.id,
					habilidadeId: h.habilidadeId,
					nome: h?.nome || "Nome não encontrado",
				}))
			);
		} catch (err) {
			console.log(err);
			Alert.alert("Erro", "Falha ao carregar vaga.");
		} finally {
			setLoadingHabilidades(false);
		}
	};

	const adicionarHabilidade = async (habilidadeId: number) => {
		try {
			const resp = await cadastrarVagaHabilidade({
				vagaId: vagaIdConvertido,
				habilidadeId,
			});
			const hab = todas.find((h) => h.id === habilidadeId);

			setMinhas((prev) => [
				...prev,
				{ id: resp.data.id, habilidadeId, nome: hab.nome },
			]);
		} catch (err: any) {
			Alert.alert("Erro", err.response?.data || err.message);
		}
	};

	const removerHabilidade = async (habilidadeId: number) => {
		const item = minhas.find((m) => m.habilidadeId === habilidadeId);
		if (!item) return;

		Alert.alert("Confirmar", "Deseja remover esta habilidade da vaga?", [
			{ text: "Cancelar", style: "cancel" },
			{
				text: "Remover",
				style: "destructive",
				onPress: async () => {
					try {
						await deletarVagaHabilidade(item.id);

						setMinhas((prev) =>
							prev.filter((x) => x.habilidadeId !== habilidadeId)
						);
					} catch (err: any) {
						Alert.alert("Erro", err.response?.data || err.message);
					}
				},
			},
		]);
	};

	const cadastrarNova = async () => {
		if (!novaHabilidade.trim()) {
			Alert.alert("Erro", "Digite o nome da habilidade.");
			return;
		}

		try {
			const resp = await cadastrarHabilidade({ nome: novaHabilidade });
			const nova = resp.data;

			setTodas((prev) => [...prev, nova]);
			setNovaHabilidade("");

			adicionarHabilidade(nova.id);
		} catch (err: any) {
			Alert.alert("Erro", err.response?.data || err.message);
		}
	};

	const salvar = async () => {
		if (!titulo.trim()) {
			Alert.alert("Erro", "Informe o título.");
			return;
		}

		try {
			setLoading(true);
			await atualizarVaga(vagaIdConvertido, {
				titulo,
				empresaId: empresa!.id_empresa,
			});

			Alert.alert("Sucesso", "Vaga atualizada com sucesso!");
			navigation.goBack();
		} catch (e: any) {
			Alert.alert("Erro", e.response?.data || e.message);
		} finally {
			setLoading(false);
		}
	};

	const habilidadesDisponiveis = todas.filter(
		(hab) => !minhas.some((m) => m.habilidadeId === hab.id)
	);

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<ScrollView
				style={styles.container}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled">
				<View style={styles.section}>
					<Text style={styles.tituloSection}>
						Informações da Vaga
					</Text>
					<View style={styles.card}>
						<TextInput
							style={styles.input}
							placeholder="Título da Vaga"
							placeholderTextColor={colors.iconeInativo}
							value={titulo}
							onChangeText={setTitulo}
						/>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.tituloSection}>
						Habilidades Requeridas
					</Text>

					{minhas.length === 0 ? (
						<View style={styles.cardVazio}>
							<Text style={styles.textoVazio}>
								Nenhuma habilidade adicionada ainda.
							</Text>
						</View>
					) : (
						<View style={styles.card}>
							{minhas.map((item) => (
								<View
									key={item.habilidadeId}
									style={styles.habilidadeItem}>
									<Text style={styles.habilidadeNome}>
										{item.nome}
									</Text>
									<TouchableOpacity
										style={styles.botaoRemover}
										onPress={() =>
											removerHabilidade(item.habilidadeId)
										}>
										<Text style={styles.textoBotaoRemover}>
											Remover
										</Text>
									</TouchableOpacity>
								</View>
							))}
						</View>
					)}
				</View>

				<View style={styles.section}>
					<Text style={styles.tituloSection}>
						Adicionar Habilidades
					</Text>

					{loadingHabilidades ? (
						<ActivityIndicator size="large" color={colors.header} />
					) : habilidadesDisponiveis.length === 0 ? (
						<View style={styles.cardVazio}>
							<Text style={styles.textoVazio}>
								Todas as habilidades já estão adicionadas.
							</Text>
						</View>
					) : (
						<View style={styles.card}>
							{habilidadesDisponiveis.map((item) => (
								<View
									key={item.id}
									style={styles.habilidadeItem}>
									<Text style={styles.habilidadeNome}>
										{item.nome}
									</Text>
									<TouchableOpacity
										style={styles.botaoAdicionar}
										onPress={() =>
											adicionarHabilidade(item.id)
										}>
										<Text
											style={styles.botaoAdicionarTexto}>
											+ Adicionar
										</Text>
									</TouchableOpacity>
								</View>
							))}
						</View>
					)}
				</View>

				<View style={styles.section}>
					<Text style={styles.tituloSection}>
						Cadastrar Nova Habilidade
					</Text>
					<View style={styles.card}>
						<TextInput
							style={styles.input}
							placeholder="Nome da habilidade"
							placeholderTextColor={colors.iconeInativo}
							value={novaHabilidade}
							onChangeText={setNovaHabilidade}
						/>
						<TouchableOpacity
							style={styles.botaoAdicionar}
							onPress={cadastrarNova}>
							<Text style={styles.botaoAdicionarTexto}>
								+ Cadastrar
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.section}>
					<TouchableOpacity
						style={[
							styles.botaoPrincipal,
							!titulo.trim() && { opacity: 0.5 },
						]}
						onPress={salvar}
						disabled={!titulo.trim() || loading}>
						{loading ? (
							<ActivityIndicator size="small" color="#fff" />
						) : (
							<Text style={styles.botaoPrincipalTexto}>
								Salvar Alterações
							</Text>
						)}
					</TouchableOpacity>
				</View>

				<View style={{ height: 40 }} />
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
