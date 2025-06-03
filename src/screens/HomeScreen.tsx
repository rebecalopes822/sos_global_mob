import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Layout from '../components/Layout';
import { useTheme } from '../theme';

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProp>();
  const { colors } = useTheme();

  return (
    <Layout>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Selecione o que deseja:
        </Text>

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('NovaSolicitacao')}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>Nova Solicitação</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, { borderColor: colors.primary }]}
          onPress={() => navigation.navigate('MinhasSolicitacoes')}
        >
          <Text style={[styles.secondaryText, { color: colors.primary }]}>Ver Minhas Solicitações</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 36,
  },
  primaryButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  secondaryButton: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
