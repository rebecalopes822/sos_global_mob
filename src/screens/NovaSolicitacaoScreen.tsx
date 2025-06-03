import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Layout from '../components/Layout';
import { useTheme } from '../theme';

export default function NovaSolicitacaoScreen() {
  const { colors } = useTheme();

  const [tipoAjuda, setTipoAjuda] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [pessoas, setPessoas] = useState('');
  const [criancas, setCriancas] = useState('');

  const handleSubmit = () => {
    console.log('Solicitação enviada:', {
      tipoAjuda,
      localizacao,
      descricao,
      pessoas,
      criancas,
    });
  };

  return (
    <Layout showBack>
      <Text style={[styles.title, { color: colors.primary }]}>Nova Solicitação</Text>

      <TextInput
        placeholder="Tipo de ajuda (Água, Resgate, etc)"
        value={tipoAjuda}
        onChangeText={setTipoAjuda}
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.placeholder}
      />

      <TextInput
        placeholder="Localização (CEP ou Endereço)"
        value={localizacao}
        onChangeText={setLocalizacao}
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.placeholder}
      />

      <TextInput
        placeholder="Descrição da situação"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={3}
        style={[styles.input, { height: 80, borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.placeholder}
      />

      <TextInput
        placeholder="Quantidade de pessoas"
        value={pessoas}
        onChangeText={setPessoas}
        keyboardType="numeric"
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.placeholder}
      />

      <TextInput
        placeholder="Há crianças? (Sim/Não)"
        value={criancas}
        onChangeText={setCriancas}
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholderTextColor={colors.placeholder}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSubmit}>
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>Enviar Solicitação</Text>
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
