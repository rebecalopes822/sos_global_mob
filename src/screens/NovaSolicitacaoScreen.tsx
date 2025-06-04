import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Layout from '../components/Layout';
import { useTheme } from '../theme';
import { criarPedidoAjuda } from '../services/PedidoAjudaService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

export default function NovaSolicitacaoScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [tipoAjuda, setTipoAjuda] = useState('');
  const [endereco, setEndereco] = useState('');
  const [pessoas, setPessoas] = useState('');
  const [nivelUrgencia, setNivelUrgencia] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const tipoAjudaId = parseInt(tipoAjuda);
    const quantidadePessoas = parseInt(pessoas);
    const nivelUrgenciaInt = parseInt(nivelUrgencia);
    const usuarioId = 1; // ajustar conforme autenticação real

    if (!tipoAjuda || !endereco || !pessoas || !nivelUrgencia) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
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
      await criarPedidoAjuda({
        usuarioId,
        tipoAjudaId,
        endereco,
        quantidadePessoas,
        nivelUrgencia: nivelUrgenciaInt,
      });

      Alert.alert('Sucesso', 'Solicitação enviada com sucesso!');
      setTipoAjuda('');
      setEndereco('');
      setPessoas('');
      setNivelUrgencia('');
      navigation.navigate('MinhasSolicitacoes');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao enviar solicitação. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout showBack>
        <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ marginTop: 12, color: colors.text }}>Enviando solicitação...</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout showBack>
      <Text style={[styles.title, { color: colors.primary }]}>Nova Solicitação</Text>

      <TouchableOpacity onPress={() => navigation.navigate('TiposAjuda')}>
        <Text style={[styles.link, { color: colors.link, textAlign: 'center' }]}>
          Ver tipos de ajuda disponíveis
        </Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Tipo de ajuda (ID: 1 a 6)"
        value={tipoAjuda}
        onChangeText={setTipoAjuda}
        keyboardType="numeric"
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.placeholder}
      />

      <TextInput
        placeholder="Endereço completo"
        value={endereco}
        onChangeText={setEndereco}
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.placeholder}
      />

      <TextInput
        placeholder="Quantidade de pessoas"
        value={pessoas}
        onChangeText={setPessoas}
        keyboardType="numeric"
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.placeholder}
      />

      <TextInput
        placeholder="Nível de urgência (1 a 5)"
        value={nivelUrgencia}
        onChangeText={setNivelUrgencia}
        keyboardType="numeric"
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.placeholder}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleSubmit}
        disabled={loading} // desabilita botão enquanto carrega
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>
          Enviar Solicitação
        </Text>
      </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
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
  link: {
    fontSize: 16,
    marginBottom: 12,
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
