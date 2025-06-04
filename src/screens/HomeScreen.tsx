import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
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
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

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

        <Text style={[styles.infoText, { color: colors.text }]}>
          Para suporte, contate: suporte@sosapp@gmail.com{'\n'}
          Telefone: (11) 99999-9999
        </Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-start', 
    marginTop: 20,                  
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  primaryButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  secondaryButton: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    marginTop: 32,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
