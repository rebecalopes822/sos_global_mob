import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppRoutes from './src/routes';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppRoutes />
    </GestureHandlerRootView>
  );
}
