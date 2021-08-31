import React from 'react';
import { 
  StyleSheet, 
  Text,
}
from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnviromentButton({ 
  title, 
  active = false ,
  ...rest
}: EnviromentButtonProps) {
  return (
    <RectButton 
      style={active ? styles.containerActive : styles.container} 
      { ...rest }
    >
      <Text style={active ? styles.titleActive : styles.title}>
        { title }
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5,
  },
  containerActive: {
    backgroundColor: colors.green_light,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 13,
  },
  titleActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    fontSize: 13,
  }
});