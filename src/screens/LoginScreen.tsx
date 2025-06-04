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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

function traduzirErroFirebase(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'O e-mail informado é inválido.';
    case 'auth/user-disabled':
      return 'Esta conta foi desativada.';
    case 'auth/user-not-found':
      return 'Usuário não encontrado.';
    case 'auth/wrong-password':
      return 'Senha incorreta.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas inválidas. Tente novamente mais tarde.';
    default:
      return 'Erro desconhecido. Por favor, tente novamente.';
  }
}

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenProp>();
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha email e senha.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.replace('Home');
    } catch (error: any) {
      const mensagem = error.code ? traduzirErroFirebase(error.code) : 'Erro desconhecido';
      Alert.alert('Erro no login', mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <View style={styles.content}>
        <Text style={[styles.welcome, { color: colors.primary }]}>Bem-vindo ao SOS GR</Text>
        <Text style={[styles.description, { color: colors.text }]}>
          Um app criado para ajudar a sociedade em situações de emergência.
        </Text>

        <Text style={[styles.title, { color: colors.text }]}>Login</Text>

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

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.buttonText} />
          ) : (
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.link, { color: colors.link }]}>Registrar</Text>
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
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
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
