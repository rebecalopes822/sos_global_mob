import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import NovaSolicitacaoScreen from '../screens/NovaSolicitacaoScreen';
import MinhasSolicitacoesScreen from '../screens/MinhasSolicitacoesScreen';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const { colors } = useTheme();

  const renderSairButton = (navigation: any) => (
    <TouchableOpacity onPress={() => navigation.replace('Login')}>
      <Text style={{ marginRight: 12, color: colors.primary, fontWeight: 'bold' }}>Sair</Text>
    </TouchableOpacity>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Telas públicas */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

        {/* Telas privadas com botão "Sair" */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Início',
            headerRight: () => renderSairButton(navigation),
          })}
        />
        <Stack.Screen
          name="NovaSolicitacao"
          component={NovaSolicitacaoScreen}
          options={({ navigation }) => ({
            title: 'Nova Solicitação',
            headerRight: () => renderSairButton(navigation),
          })}
        />
        <Stack.Screen
          name="MinhasSolicitacoes"
          component={MinhasSolicitacoesScreen}
          options={({ navigation }) => ({
            title: 'Minhas Solicitações',
            headerRight: () => renderSairButton(navigation),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
