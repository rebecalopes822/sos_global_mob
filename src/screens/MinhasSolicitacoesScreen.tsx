import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Layout from '../components/Layout';
import { useTheme } from '../theme';
import { listarPedidosAjuda, deletarPedido } from '../services/PedidoAjudaService';
import { PedidoAjuda } from '../types/PedidoAjuda';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

export default function MinhasSolicitacoesScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [pedidos, setPedidos] = useState<PedidoAjuda[]>([]);
  const [loading, setLoading] = useState(false);

  const carregarPedidos = async () => {
    setLoading(true);
    try {
      const response = await listarPedidosAjuda();
      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      Alert.alert('Erro', 'Não foi possível carregar as solicitações.');
    } finally {
      setLoading(false);
    }
  };

  const excluirPedido = async (id: number) => {
    setLoading(true);
    try {
      await deletarPedido(id);
      Alert.alert('Sucesso', 'Solicitação excluída com sucesso!');
      carregarPedidos();
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
      Alert.alert('Erro', 'Não foi possível excluir a solicitação.');
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarPedidos();
    }, [])
  );

  const renderItem = ({ item }: { item: PedidoAjuda }) => {
    const tipoValido = item.tipoAjudaId >= 1 && item.tipoAjudaId <= 6;

    return (
      <View style={[styles.card, { borderColor: colors.primary }]}>
        <Text style={[styles.cardText, { color: colors.text }]}>Endereço: {item.endereco}</Text>
        <Text style={[styles.cardText, { color: colors.text }]}>
          Tipo de Ajuda ID: {tipoValido ? item.tipoAjudaId : '❌ Tipo inválido'}
        </Text>
        <Text style={[styles.cardText, { color: colors.text }]}>Pessoas: {item.quantidadePessoas}</Text>
        <Text style={[styles.cardText, { color: colors.text }]}>Urgência: {item.nivelUrgencia}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditarSolicitacao', { pedido: item })}
            style={[styles.editButton, { backgroundColor: colors.primary }]}
          >
            <Text style={{ color: colors.buttonText }}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => excluirPedido(item.id)}
            style={[styles.deleteButton, { backgroundColor: colors.secondary ?? '#ff3b30' }]}
          >
            <Text style={{ color: colors.buttonText }}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <Layout showBack>
        <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ marginTop: 12, color: colors.text }}>Carregando solicitações...</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout showBack>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.primary }]}>Minhas Solicitações</Text>

        {pedidos.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={[styles.info, { color: colors.text }]}>
              Você ainda não fez nenhuma solicitação.
            </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate('NovaSolicitacao')}
            >
              <Text style={{ color: colors.buttonText }}>Fazer uma nova solicitação</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={pedidos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 16,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  editButton: {
    flex: 1,
    marginRight: 8,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    marginLeft: 8,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
