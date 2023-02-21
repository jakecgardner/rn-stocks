import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 4,
  },
});

type TitleProps = {
  text: string;
};

const Title = ({text}: TitleProps) => {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Title;
