import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { atualizarPedido } from '../services/PedidoAjudaService';
import Layout from '../components/Layout';
import { useTheme } from '../theme';
import { PedidoAjuda } from '../types/PedidoAjuda';

type EditarSolicitacaoRouteProp = RouteProp<RootStackParamList, 'EditarSolicitacao'>;

export default function EditarSolicitacaoScreen() {
  const route = useRoute<EditarSolicitacaoRouteProp>();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { pedido } = route.params;

  const [tipoAjudaId, setTipoAjudaId] = useState(String(pedido.tipoAjudaId));
  const [endereco, setEndereco] = useState(pedido.endereco);
  const [quantidadePessoas, setQuantidadePessoas] = useState(String(pedido.quantidadePessoas));

  const handleAtualizar = async () => {
    try {
      await atualizarPedido(pedido.id, {
        usuarioId: pedido.usuarioId,
        tipoAjudaId: parseInt(tipoAjudaId),
        endereco,
        quantidadePessoas: parseInt(quantidadePessoas),
        nivelUrgencia: pedido.nivelUrgencia,
      });

      Alert.alert('Sucesso', 'Solicitação atualizada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar a solicitação.');
    }
  };

  return (
    <Layout showBack>
      <Text style={[styles.title, { color: colors.primary }]}>Editar Solicitação</Text>

      <TextInput
        placeholder="Tipo de Ajuda"
        value={tipoAjudaId}
        onChangeText={setTipoAjudaId}
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.placeholder}
      />

      <TextInput
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.placeholder}
      />

      <TextInput
        placeholder="Quantidade de Pessoas"
        value={quantidadePessoas}
        onChangeText={setQuantidadePessoas}
        keyboardType="numeric"
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.placeholder}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleAtualizar}
      >
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>Atualizar</Text>
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
});
