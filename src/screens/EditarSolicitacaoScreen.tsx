import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Layout from '../components/Layout';
import { useTheme } from '../theme';
import { atualizarPedido } from '../services/PedidoAjudaService';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type EditarScreenRouteProp = RouteProp<RootStackParamList, 'EditarSolicitacao'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const tiposAjudaExplicacao = [
  { id: 1, descricao: 'Água' },
  { id: 2, descricao: 'Alimentos' },
  { id: 3, descricao: 'Abrigo' },
  { id: 4, descricao: 'Resgate' },
  { id: 5, descricao: 'Atendimento Médico' },
  { id: 6, descricao: 'Roupas' },
];

export default function EditarSolicitacaoScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EditarScreenRouteProp>();
  const pedido = route.params.pedido;

  const [tipoAjuda, setTipoAjuda] = useState(pedido.tipoAjudaId.toString());
  const [endereco, setEndereco] = useState(pedido.endereco);
  const [pessoas, setPessoas] = useState(pedido.quantidadePessoas.toString());
  const [nivelUrgencia, setNivelUrgencia] = useState(pedido.nivelUrgencia.toString());
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    const tipoAjudaId = parseInt(tipoAjuda);
    const quantidadePessoas = parseInt(pessoas);
    const nivelUrgenciaInt = parseInt(nivelUrgencia);
    const usuarioId = pedido.usuarioId;

    if (!tipoAjuda || !endereco.trim() || !pessoas || !nivelUrgencia) {
      Alert.alert('Atenção', 'Todos os campos devem ser preenchidos.');
      return;
    }

    if (isNaN(tipoAjudaId) || tipoAjudaId < 1 || tipoAjudaId > 6) {
      Alert.alert('Erro', 'O Tipo de Ajuda deve estar entre 1 e 6.');
      return;
    }

    if (isNaN(quantidadePessoas) || quantidadePessoas <= 0) {
      Alert.alert('Erro', 'Informe um número válido de pessoas.');
      return;
    }

    if (isNaN(nivelUrgenciaInt) || nivelUrgenciaInt < 1 || nivelUrgenciaInt > 5) {
      Alert.alert('Erro', 'Nível de urgência deve ser um número entre 1 e 5.');
      return;
    }

    setLoading(true);
    try {
      await atualizarPedido(pedido.id, {
        usuarioId,
        tipoAjudaId,
        endereco: endereco.trim(),
        quantidadePessoas,
        nivelUrgencia: nivelUrgenciaInt,
      });

      Alert.alert('Sucesso', 'Solicitação atualizada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar a solicitação.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout showBack>
        <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ marginTop: 12, color: colors.text }}>Atualizando solicitação...</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout showBack>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        <Text style={[styles.title, { color: colors.primary }]}>Editar Solicitação</Text>

        <View style={styles.tipoAjudaContainer}>
          <Text style={[styles.label, { color: colors.text }]}>
            IDs e Tipos de Ajuda disponíveis:
          </Text>
          {tiposAjudaExplicacao.map((tipo) => (
            <Text key={tipo.id} style={[styles.tipoAjudaItem, { color: colors.text }]}>
              {tipo.id} - {tipo.descricao}
            </Text>
          ))}
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Tipo de ajuda (ID: 1 a 6)</Text>
          <TextInput
            value={tipoAjuda}
            onChangeText={setTipoAjuda}
            keyboardType="numeric"
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Endereço completo</Text>
          <TextInput
            value={endereco}
            onChangeText={setEndereco}
            multiline
            style={[styles.input, { borderColor: colors.border, color: colors.text, height: 80 }]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Quantidade de pessoas</Text>
          <TextInput
            value={pessoas}
            onChangeText={setPessoas}
            keyboardType="numeric"
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Nível de urgência (1 a 5)</Text>
          <TextInput
            value={nivelUrgencia}
            onChangeText={setNivelUrgencia}
            keyboardType="numeric"
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleUpdate}
          disabled={loading} 
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  tipoAjudaContainer: {
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  },
  tipoAjudaItem: {
    fontSize: 14,
    marginVertical: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
