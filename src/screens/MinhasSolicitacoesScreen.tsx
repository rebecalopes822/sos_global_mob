import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../components/Layout';
import { useTheme } from '../theme';

export default function MinhasSolicitacoesScreen() {
  const { colors } = useTheme();

  return (
    <Layout showBack>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.primary }]}>
          Minhas Solicitações
        </Text>

        {/* Quando implementar o CRUD, você pode mapear os dados aqui */}
        <Text style={styles.info}>Você ainda não fez nenhuma solicitação.</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
