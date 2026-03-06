import { useEffect, useState } from "react";
import {
	View,
	Text,
	ActivityIndicator,
	Alert,
	TouchableOpacity,
	ScrollView,
	TextInput,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import {
	listarHabilidades,
	buscarUsuarioHabilidadesPorUsuario,
	cadastrarUsuarioHabilidade,
	deletarUsuarioHabilidade,
	cadastrarHabilidade,
} from "../../../types/Endpoints";
import { useAuthUsuario } from "../../Context/UsuarioAuthContext";
import { useTheme } from "../../Context/ThemeContext";
import { perfilHabilidadeStyles } from "./styles";

export default function PerfilHabilidade() {
	const { user } = useAuthUsuario();
	const { colors } = useTheme();
	const styles = perfilHabilidadeStyles(colors);

	if (!user) {
		return (
			<View style={styles.container}>
				<Text style={styles.textoError}>Usuário não autenticado.</Text>
			</View>
		);
	}

	const usuarioId = user.id_usuario;
	const [todas, setTodas] = useState<any[]>([]);
	const [minhas, setMinhas] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [novaHabilidade, setNovaHabilidade] = useState("");

	const carregar = async () => {
		setLoading(true);
		try {
			const respHab = await listarHabilidades();
			const respMinhas = await buscarUsuarioHabilidadesPorUsuario(
				usuarioId
			);
			setTodas(respHab.data.content || respHab.data);
			setMinhas(respMinhas.data);
		} catch (err: any) {
			console.log("Erro:", err.response?.data || err.message);
			Alert.alert("Erro", "Não foi possível carregar as habilidades.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		carregar();
	}, []);

	const adicionar = async (habilidadeId: number) => {
		try {
			await cadastrarUsuarioHabilidade({ usuarioId, habilidadeId });
			await carregar();
		} catch (err: any) {
			Alert.alert("Erro", err.response?.data || err.message);
		}
	};

	const remover = async (id_user_hab: number) => {
		Alert.alert("Confirmar", "Deseja realmente remover esta habilidade?", [
			{ text: "Cancelar", style: "cancel" },
			{
				text: "Remover",
				style: "destructive",
				onPress: async () => {
					try {
						await deletarUsuarioHabilidade(id_user_hab);
						await carregar();
					} catch (err: any) {
						Alert.alert("Erro", err.response?.data || err.message);
					}
				},
			},
		]);
	};

	const cadastrarNovaHabilidade = async () => {
		if (!novaHabilidade.trim()) {
			Alert.alert("Erro", "Digite o nome da habilidade.");
			return;
		}

		try {
			const resp = await cadastrarHabilidade({ nome: novaHabilidade });
			const novaHabId = resp.data.id;

			await cadastrarUsuarioHabilidade({
				usuarioId,
				habilidadeId: novaHabId,
			});

			Alert.alert(
				"Sucesso",
				`Habilidade "${novaHabilidade}" cadastrada e adicionada ao seu perfil!`
			);
			setNovaHabilidade("");

			await carregar();
		} catch (err: any) {
			Alert.alert("Erro", err.response?.data || err.message);
		}
	};

	const habilidadesDisponiveis = todas.filter(
		(hab) => !minhas.some((m) => m.habilidadeId === hab.id)
	);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={colors.header} />
				<Text style={styles.textoLoading}>
					Carregando habilidades...
				</Text>
			</View>
		);
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<ScrollView
				style={styles.container}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled">
				<View style={styles.section}>
					<Text style={styles.tituloSection}>Minhas Habilidades</Text>
					<Text style={styles.subtituloSection}>
						{minhas.length} habilidade
						{minhas.length !== 1 ? "s" : ""} adicionada
						{minhas.length !== 1 ? "s" : ""}
					</Text>
					{minhas.length === 0 ? (
						<View style={styles.cardVazio}>
							<Text style={styles.textoVazio}>
								Você ainda não adicionou nenhuma habilidade.
							</Text>
						</View>
					) : (
						<View style={styles.card}>
							{minhas.map((item, index) => {
								const hab = todas.find(
									(h) => h.id === item.habilidadeId
								);
								return (
									<View
										key={`minhas-${
											item.id_usuario_habilidade || index
										}`}>
										<View style={styles.habilidadeItem}>
											<View style={styles.habilidadeInfo}>
												<View style={styles.badge}>
													<Text
														style={
															styles.textoBadge
														}>
														✓
													</Text>
												</View>
												<Text
													style={
														styles.habilidadeNome
													}>
													{hab?.nome ??
														"Habilidade desconhecida"}
												</Text>
											</View>
											<TouchableOpacity
												style={styles.botaoRemover}
												onPress={() =>
													remover(
														item.id_usuario_habilidade
													)
												}>
												<Text
													style={
														styles.textoBotaoRemover
													}>
													Remover
												</Text>
											</TouchableOpacity>
										</View>
										{index < minhas.length - 1 && (
											<View style={styles.divisor} />
										)}
									</View>
								);
							})}
						</View>
					)}
				</View>

				<View style={styles.section}>
					<Text style={styles.tituloSection}>
						Adicionar Habilidades
					</Text>
					<Text style={styles.subtituloSection}>
						{habilidadesDisponiveis.length} habilidade
						{habilidadesDisponiveis.length !== 1 ? "s" : ""}{" "}
						disponível
						{habilidadesDisponiveis.length !== 1 ? "is" : ""}
					</Text>
					{habilidadesDisponiveis.length === 0 ? (
						<View style={styles.cardVazio}>
							<Text style={styles.textoVazio}>
								Você já adicionou todas as habilidades
								disponíveis!
							</Text>
						</View>
					) : (
						<View style={styles.card}>
							{habilidadesDisponiveis.map((item, index) => (
								<View key={`disponiveis-${item.id}`}>
									<View style={styles.habilidadeItem}>
										<Text style={styles.habilidadeNome}>
											{item.nome}
										</Text>
										<TouchableOpacity
											style={styles.botaoAdicionar}
											onPress={() => adicionar(item.id)}>
											<Text
												style={
													styles.botaoAdicionarTexto
												}>
												+ Adicionar
											</Text>
										</TouchableOpacity>
									</View>
									{index <
										habilidadesDisponiveis.length - 1 && (
										<View style={styles.divisor} />
									)}
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
							value={novaHabilidade}
							onChangeText={setNovaHabilidade}
						/>
						<TouchableOpacity
							style={styles.botaoAdicionar}
							onPress={cadastrarNovaHabilidade}>
							<Text style={styles.botaoAdicionarTexto}>
								+ Cadastrar
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={{ height: 40 }} />
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
