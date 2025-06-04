import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Layout from '../components/Layout';
import { useTheme } from '../theme';
import { criarUsuario } from '../services/UsuarioService';
import { MaskedTextInput } from 'react-native-mask-text';

type RegisterScreenProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenProp>();
  const { colors } = useTheme();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [ehVoluntario, setEhVoluntario] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async () => {
    if (!nome || !email || !telefone || !ehVoluntario) {
      Alert.alert('Atenção', 'Todos os campos devem ser preenchidos.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Erro no Email', 'Digite um email válido. Ex: usuario@email.com');
      return;
    }

    // Validação: telefone precisa estar no formato completo com 15 caracteres
    if (telefone.length !== 15) {
      Alert.alert('Erro no Telefone', 'Digite um telefone válido no formato (11) 91234-5678');
      return;
    }

    if (ehVoluntario !== 'Sim' && ehVoluntario !== 'Não') {
      Alert.alert(
        'Erro no campo "É voluntário?"',
        'Digite exatamente "Sim" ou "Não", com a primeira letra maiúscula.'
      );
      return;
    }

    const ehVoluntarioInt = ehVoluntario === 'Sim' ? 1 : 0;

    try {
      await criarUsuario({
        nome,
        email,
        telefone,
        ehVoluntario: ehVoluntarioInt,
      });

      Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
      navigation.navigate('Login');
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
        <MaskedTextInput
          mask="(99) 99999-9999"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
          placeholder="Telefone"
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

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleRegister}
        >
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
