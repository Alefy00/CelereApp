import React from 'react';
import {View, Text, StyleSheet, TextInput as RNTextInput} from 'react-native';

function TextInput({
  style,
  inputStyle,
  error,
  errorStyle,
  onChange,
  onTouch,
  name,
  ...attributes
}) {
  const onChangeText = text => {
    onChange(name, text);
  };

  const onBlurText = () => {
    onTouch(name);
  };

  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <View style={styles.inputContainer}>
        <RNTextInput
          style={StyleSheet.flatten([styles.inputStyle, inputStyle])}
          onChangeText={onChangeText}
          onBlur={onBlurText}
          underlineColorAndroid="transparent"
          {...attributes}
        />
      </View>
      {error ? (
        <Text style={StyleSheet.flatten([styles.error, errorStyle])}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  inputContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
  },
  inputStyle: {
    fontSize: 16,
    height: 50,
  },
  error: {
    marginTop: 8,
    color: 'red',
    fontSize: 15,
  },
});

export default TextInput;
