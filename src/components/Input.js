import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const Input = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={props.value}
        placeholder={props.placeholder}
        onChangeText={(text) => props.handler(text, props.text)}
        placeholderTextColor="white"
        secureTextEntry={props.isPassword}
        keyboardType={props.type}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    marginHorizontal: 20,
    marginBottom: 10,
  },

  input: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default Input;
