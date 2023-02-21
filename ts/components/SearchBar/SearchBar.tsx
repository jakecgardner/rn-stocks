import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  input: {
    backgroundColor: Colors.secondaryBackground,
    color: Colors.white,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    flex: 4,
    fontSize: 16,
  },
});

type SearchBarProps = {
  text: string;
  onChange: (text: string) => void;
};

const SearchBar = ({text = '', onChange}: SearchBarProps) => {
  return (
    <View style={styles.row}>
      <TextInput
        autoComplete="off"
        autoCorrect={false}
        maxLength={50}
        placeholder="Search"
        placeholderTextColor={Colors.secondaryLabel}
        returnKeyType="search"
        style={styles.input}
        onChangeText={onChange}
        value={text}
      />
      {text.length > 0 && (
        <Button title="Cancel" onPress={() => onChange('')} />
      )}
    </View>
  );
};

export default SearchBar;
