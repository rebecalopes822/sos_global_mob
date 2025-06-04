import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Layout from '../components/Layout';
import { useTheme } from '../theme';

const tiposAjuda = [
  { id: 1, nome: 'Alimentos', descricao: 'Doação de cestas básicas ou alimentos não perecíveis' },
  { id: 2, nome: 'Roupas', descricao: 'Distribuição de roupas para pessoas em vulnerabilidade' },
  { id: 3, nome: 'Atendimento Médico', descricao: 'Assistência médica, transporte ou primeiros socorros' },
  { id: 4, nome: 'Atendimento Psicológico', descricao: 'Atendimento por profissionais voluntários' },
  { id: 5, nome: 'Resgate e Transporte', descricao: 'Ajuda com locomoção em emergências' },
  { id: 6, nome: 'Escuta e Apoio', descricao: 'Acolhimento emocional e escuta ativa' },
];

export default function TiposAjudaScreen() {
  const { colors } = useTheme();

  return (
    <Layout showBack>
      <Text style={[styles.title, { color: colors.primary }]}>Tipos de Ajuda</Text>
      <FlatList
        data={tiposAjuda}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderColor: colors.primary }]}>
            <Text style={[styles.nome, { color: colors.text }]}>{item.id} - {item.nome}</Text>
            <Text style={[styles.descricao, { color: colors.text }]}>{item.descricao}</Text>
          </View>
        )}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
  },
});
