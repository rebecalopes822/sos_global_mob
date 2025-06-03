import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Layout from '../components/Layout';
import { useTheme } from '../theme';
import { criarUsuario } from '../services/UsuarioService';

type RegisterScreenProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenProp>();
  const { colors } = useTheme();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [ehVoluntario, setEhVoluntario] = useState('');

  const handleRegister = async () => {
    try {
      const ehVoluntarioInt = ehVoluntario.toLowerCase() === 'sim' ? 1 : ehVoluntario.toLowerCase() === 'não' || ehVoluntario.toLowerCase() === 'nao' ? 0 : -1;

      if (ehVoluntarioInt === -1) {
        Alert.alert('Erro', 'Campo "É Voluntário?" deve ser "Sim" ou "Não".');
        return;
      }

      await criarUsuario({
        nome,
        email,
        telefone,
        ehVoluntario: ehVoluntarioInt,
      });

      Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
      navigation.navigate('Login'); // ou 'Home', conforme sua lógica
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível registrar. Verifique os dados.');
    }
  };

  return (
    <Layout>
      <View style={styles.content}>
        <Text style={[styles.welcome, { color: colors.primary }]}>Crie sua conta no SOS GR</Text>

        <TextInput
          placeholder="Nome completo"
          value={nome}
          onChangeText={setNome}
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          placeholder='É voluntário? ("Sim" ou "Não")'
          value={ehVoluntario}
          onChangeText={setEhVoluntario}
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholderTextColor={colors.placeholder}
        />

        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleRegister}>
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.link, { color: colors.link }]}>Já tem conta? Faça login</Text>
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
  welcome: {
    fontSize: 22,
    fontWeight: '700',
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
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
  },
});
