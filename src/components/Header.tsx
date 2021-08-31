import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textGreeting}>Olá,</Text>
        <Text style={styles.textUserName}>Samuel</Text>
      </View>

      <Image source={{uri: 'https://avatars.githubusercontent.com/u/21090437?v=4'}} style={styles.imageProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,

  },
  textGreeting:{
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 40,
  },
  textUserName:{
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },
  imageProfile: {
    height: 56,
    width: 56,
    borderRadius: 28,
  }
});