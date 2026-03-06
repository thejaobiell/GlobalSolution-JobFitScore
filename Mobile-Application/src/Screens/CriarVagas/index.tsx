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
	cadastrarVaga,
	listarHabilidades,
	cadastrarHabilidade,
	cadastrarVagaHabilidade,
	deletarVagaHabilidade,
	buscarVagaHabilidadePorVaga,
} from "../../../types/Endpoints";
import { criarVagasStyles } from "./styles";

type Props = NativeStackScreenProps<Telas, "CriarVagas">;

export default function CriarVagas({ navigation }: Props) {
	const { colors } = useTheme();
	const { empresa } = useAuthEmpresa();
	const styles = criarVagasStyles(colors);

	const [titulo, setTitulo] = useState("");
	const [vagaId, setVagaId] = useState<number | null>(null);
	const [todas, setTodas] = useState<any[]>([]);
	const [minhas, setMinhas] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [loadingHabilidades, setLoadingHabilidades] = useState(false);
	const [novaHabilidade, setNovaHabilidade] = useState("");

	useEffect(() => {
		const carregar = async () => {
			setLoadingHabilidades(true);
			try {
				const respHabilidade = await listarHabilidades();
				setTodas(respHabilidade.data.content || respHabilidade.data);
			} catch (err: any) {
				console.log("Erro:", err.response?.data || err.message);
			} finally {
				setLoadingHabilidades(false);
			}
		};
		carregar();
	}, []);

	const adicionarHabilidade = async (habilidadeId: number) => {
		if (vagaId) {
			try {
				await cadastrarVagaHabilidade({ vagaId, habilidadeId });
			} catch (err: any) {
				Alert.alert("Erro", err.response?.data || err.message);
				return;
			}
		}

		const hab = todas.find((h) => h.id === habilidadeId);
		if (hab)
			setMinhas((prev) => [...prev, { habilidadeId, nome: hab.nome }]);
	};

	const removerHabilidade = (habilidadeId: number) => {
		if (vagaId) {
			Alert.alert(
				"Confirmar",
				"Deseja remover esta habilidade da vaga?",
				[
					{ text: "Cancelar", style: "cancel" },
					{
						text: "Remover",
						style: "destructive",
						onPress: async () => {
							try {
								const vagaHab = minhas.find(
									(m) => m.habilidadeId === habilidadeId
								);
								if (vagaHab?.id) {
									await deletarVagaHabilidade(vagaHab.id);
								}
								setMinhas((prev) =>
									prev.filter(
										(m) => m.habilidadeId !== habilidadeId
									)
								);
							} catch (err: any) {
								Alert.alert(
									"Erro",
									err.response?.data || err.message
								);
							}
						},
					},
				]
			);
		} else {
			setMinhas((prev) =>
				prev.filter((m) => m.habilidadeId !== habilidadeId)
			);
		}
	};

	const cadastrarNova = async () => {
		if (!novaHabilidade.trim()) {
			Alert.alert("Erro", "Digite o nome da habilidade.");
			return;
		}

		try {
			const resp = await cadastrarHabilidade({ nome: novaHabilidade });
			const novaHab = resp.data;

			setNovaHabilidade("");
			setTodas((prev) => [...prev, novaHab]);
			adicionarHabilidade(novaHab.id);
		} catch (err: any) {
			Alert.alert("Erro", err.response?.data || err.message);
		}
	};

	const criarVaga = async () => {
		if (!titulo.trim()) {
			Alert.alert("Erro", "Informe o título da vaga.");
			return;
		}
		if (minhas.length === 0) {
			Alert.alert(
				"Atenção",
				"Adicione pelo menos uma habilidade necessária antes de cadastrar a vaga."
			);
			return;
		}
		if (!empresa) {
			Alert.alert("Erro", "Nenhuma empresa autenticada.");
			return;
		}

		try {
			setLoading(true);
			const resp = await cadastrarVaga({
				titulo,
				empresaId: empresa!.id_empresa,
			});
			const id = resp.data.id;
			setVagaId(id);

			for (const hab of minhas) {
				if (!hab.id)
					await cadastrarVagaHabilidade({
						vagaId: id,
						habilidadeId: hab.habilidadeId,
					});
			}

			Alert.alert("Sucesso", "Vaga cadastrada com sucesso!");
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
								Adicione pelo menos uma habilidade necessária
								para a vaga.
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
								Todas as habilidades já foram adicionadas!
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
							(!titulo.trim() || minhas.length === 0) && {
								opacity: 0.6,
							},
						]}
						onPress={criarVaga}
						disabled={
							!titulo.trim() || minhas.length === 0 || loading
						}>
						{loading ? (
							<ActivityIndicator size="small" color="#fff" />
						) : (
							<Text style={styles.botaoPrincipalTexto}>
								Cadastrar Vaga
							</Text>
						)}
					</TouchableOpacity>
				</View>

				<View style={{ height: 40 }} />
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
