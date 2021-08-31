import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text, 
  View,
} 
from 'react-native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Confirmation() {
  const { navigate } = useNavigation();
  
  const handleInit = useCallback(() => {
    navigate('PlantSelect');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          😄
        </Text>

        <Text style={styles.title}>
          Prontinho
        </Text>

        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>
        <View style={styles.footer}>
          <Button title="Começar" onPress={handleInit} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 96,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32,
    marginTop: 64,
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 32,
    marginTop: 20,
  },
  footer: {
    width: '100%',
    paddingVertical: 48,
    paddingHorizontal: 20,
  }
});