import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
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
  const [localizacao, setLocalizacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [pessoas, setPessoas] = useState('');
  const [criancas, setCriancas] = useState('');

  const handleSubmit = async () => {
    const tipoAjudaId = parseInt(tipoAjuda);
    const quantidadePessoas = parseInt(pessoas);
    const nivelUrgencia = 3; // fixo
    const usuarioId = 1;     // fixo até login

    if (!tipoAjuda || !localizacao || !pessoas) {
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

    try {
      await criarPedidoAjuda({
        usuarioId,
        tipoAjudaId,
        endereco: localizacao,
        quantidadePessoas,
        nivelUrgencia,
      });

      Alert.alert('Sucesso', 'Solicitação enviada com sucesso!');
      setTipoAjuda('');
      setLocalizacao('');
      setDescricao('');
      setPessoas('');
      setCriancas('');

      navigation.navigate('MinhasSolicitacoes');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao enviar solicitação. Verifique os dados.');
    }
  };

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
        placeholder="Localização (CEP ou Endereço)"
        value={localizacao}
        onChangeText={setLocalizacao}
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.placeholder}
      />

      <TextInput
        placeholder="Descrição da situação"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={3}
        style={[styles.input, { height: 80, borderColor: colors.border, color: colors.text }]}
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
        placeholder="Há crianças? (Sim/Não)"
        value={criancas}
        onChangeText={setCriancas}
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.placeholder}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleSubmit}
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
});
