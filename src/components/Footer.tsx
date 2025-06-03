import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

export default function Footer() {
  const { colors } = useTheme();

  return (
    <View style={styles.footer}>
      <Text style={[styles.text, { color: colors.text }]}>
        🌱 “A solidariedade é o amor em movimento.” — D. Hélder Câmara
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // <- fundo branco fixo
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
