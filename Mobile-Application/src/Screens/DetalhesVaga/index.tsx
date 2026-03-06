import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	ActivityIndicator,
	Alert,
	TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Telas } from "../../../types/Telas";

import { useTheme } from "../../Context/ThemeContext";
import { detalhesVagaStyles } from "./styles";

import {
	buscarVagaPorId,
	buscarVagaHabilidadePorVaga,
	buscarEmpresaPorId,
	cadastrarCandidatura,
	avaliarMatch,
	buscarUsuarioHabilidadesPorUsuario,
} from "../../../types/Endpoints";

import { useAuthUsuario } from "../../Context/UsuarioAuthContext";
import { Habilidade, Vaga } from "../../../types/Tabelas";

type Props = NativeStackScreenProps<Telas, "DetalhesVaga">;

export default function DetalhesVaga({ route }: Props) {
	const { vagaId } = route.params;
	const { colors } = useTheme();
	const styles = detalhesVagaStyles(colors);

	const { user } = useAuthUsuario();

	const [vaga, setVaga] = useState<Vaga>();
	const [empresaNome, setEmpresaNome] = useState<string>("");
	const [habilidades, setHabilidades] = useState<Habilidade[]>([]);
	const [loading, setLoading] = useState(true);
	const [calculandoFit, setCalculandoFit] = useState(false);
	const [fit, setFit] = useState<{
		score: number;
		feedback: string;
	} | null>(null);

	const carregar = async () => {
		try {
			setLoading(true);
			const resp = await buscarVagaPorId(vagaId);
			const vagaData = resp.data;
			setVaga(vagaData);

			const respHab = await buscarVagaHabilidadePorVaga(vagaId);
			setHabilidades(respHab.data);

			if (vagaData?.empresa_id) {
				const respEmp = await buscarEmpresaPorId(vagaData.empresa_id);
				setEmpresaNome(respEmp.data.nome);
			}
		} catch (err) {
			console.log(err);
			Alert.alert("Erro", "Não foi possível carregar a vaga.");
		} finally {
			setLoading(false);
		}
	};

	const candidatar = async () => {
		if (!fit) return;
		if (!user?.id_usuario) {
			Alert.alert("Erro", "Usuário não encontrado.");
			return;
		}

		try {
			await cadastrarCandidatura({
				usuarioId: user.id_usuario,
				vagaId: vagaId,
				status: "Em Análise",
			});
			Alert.alert("Sucesso", "Candidatura enviada.");
		} catch (err) {
			console.log(err);
			Alert.alert("Erro", "Não foi possível enviar a candidatura.");
		}
	};

	useEffect(() => {
		carregar();
	}, []);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={colors.header} />
			</View>
		);
	}

	if (!vaga) {
		return (
			<View style={styles.container}>
				<Text style={styles.textoVazio}>Vaga não encontrada.</Text>
			</View>
		);
	}

	const calcularFit = async () => {
		if (!user) {
			Alert.alert("Erro", "Usuário não encontrado.");
			return;
		}
		if (!vaga) {
			Alert.alert("Erro", "Vaga não carregada.");
			return;
		}
		if (calculandoFit || fit) return;

		setCalculandoFit(true);
		try {
			const respHabs = await buscarUsuarioHabilidadesPorUsuario(
				user.id_usuario
			);
			const usuarioHabs = respHabs.data;

			if (!usuarioHabs || usuarioHabs.length === 0) {
				Alert.alert(
					"Atenção",
					"Nenhuma habilidade encontrada para o usuário."
				);
				return;
			}

			const habilidadesUsuario = usuarioHabs.map(
				(uh: any) => uh.habilidadeNome
			);

			const vagaPayload = {
				titulo: vaga.titulo,
				empresa: empresaNome,
				requisitos: habilidadesUsuario,
				descricao: "",
			};

			const candidatoPayload = {
				nome: user.nome,
				habilidades: habilidadesUsuario,
				experiencia: "",
				cursos: [],
			};

			const resp = await avaliarMatch(vagaPayload, candidatoPayload);
			setFit(resp.data.avaliacoes[0]);
		} catch (e: any) {
			console.error("Erro ao calcular JobFIT-score:", e);
			Alert.alert("Erro", "Não foi possível calcular o JobFIT-score.");
		} finally {
			setCalculandoFit(false);
		}
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.titulo}>{vaga.titulo}</Text>

			<View style={styles.card}>
				<Text style={styles.cardTitulo}>Habilidades Requeridas</Text>
				{habilidades.length === 0 ? (
					<Text style={styles.textoVazio}>
						Nenhuma habilidade cadastrada.
					</Text>
				) : (
					habilidades.map((h, index) => (
						<View
							key={h.id_habilidade ?? index}
							style={styles.habilidadeItem}>
							<Text style={styles.habilidadeNome}>{h.nome}</Text>
						</View>
					))
				)}
			</View>

			<TouchableOpacity
				style={styles.botaoAcao}
				onPress={candidatar}
				disabled={!fit}>
				<Text style={styles.botaoAcaoTexto}>Candidatar-se</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.botaoAcao}
				onPress={calcularFit}
				disabled={calculandoFit || !!fit}>
				{calculandoFit ? (
					<ActivityIndicator color={colors.header} />
				) : (
					<Text style={styles.botaoAcaoTexto}>Ver JobFIT-score</Text>
				)}
			</TouchableOpacity>

			{fit && (
				<View style={styles.card}>
					<Text style={styles.cardTitulo}>
						JobFIT-score: {fit.score}
					</Text>
					<Text>{fit.feedback}</Text>
				</View>
			)}

			<View style={{ height: 40 }} />
		</ScrollView>
	);
}
