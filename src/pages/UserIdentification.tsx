import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { 
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [valueName, setValueName] = useState('');

  const { navigate } = useNavigation();

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setIsFilled(!!value);
    setValueName(value);
  }, []);

  const handleSaveName = useCallback(() => {
    navigate('Confirmation');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  { isFilled ? '😄' : '😀' } 
                </Text>
                <Text style={styles.title}>
                  Como podemos{'\n'}chamar você?
                </Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                ]}
                placeholder="Digite um nome"
                placeholderTextColor={colors.gray}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
                value={valueName}
              />
              <View style={styles.footer}>
                <Button 
                  title="Confirmar" 
                  disabled={!isFilled}
                  onPress={handleSaveName}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 54,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.15,
  },
  header: {
    alignItems: 'center'
  },
  emoji: {
    fontSize: 44,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 48,
    padding: 10,
    textAlign: 'center',
    fontFamily: fonts.text,
  },
  footer: {
    width: '100%',
    paddingVertical: 48,
    paddingHorizontal: 20,
  }
 });