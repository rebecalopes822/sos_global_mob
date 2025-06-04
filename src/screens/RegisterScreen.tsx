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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type RegisterScreenProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

function traduzirErroFirebase(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Este e-mail já está em uso.';
    case 'auth/invalid-email':
      return 'O e-mail informado é inválido.';
    case 'auth/operation-not-allowed':
      return 'Operação não permitida. Contate o suporte.';
    case 'auth/weak-password':
      return 'A senha deve ter no mínimo 6 caracteres.';
    default:
      return 'Erro desconhecido. Por favor, tente novamente.';
  }
}

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenProp>();
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.replace('Login');
    } catch (error: any) {
      const mensagem = error.code ? traduzirErroFirebase(error.code) : 'Erro desconhecido';
      Alert.alert('Erro no registro', mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.primary }]}>Criar Conta</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholderTextColor={colors.placeholder}
        />

        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholderTextColor={colors.placeholder}
        />

        <TextInput
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholderTextColor={colors.placeholder}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.buttonText} />
          ) : (
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>Registrar</Text>
          )}
        </TouchableOpacity>

        <Text style={[styles.footerText, { color: colors.text }]}>
          Ao criar uma conta, você concorda com nossos Termos de Serviço e Política de Privacidade.
        </Text>

        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={[styles.link, { color: colors.link }]}>Já tem uma conta? Faça login</Text>
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
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#4CAF50',
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    padding: 16,
    borderRadius: 16, 
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
    color: '#777',
  },
  link: {
    fontSize: 16,
    marginTop: 12,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
