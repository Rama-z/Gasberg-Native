import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const FancyButton = ({
  text,
  color,
  onPressHandler: { onPressIn, onPressOut, onLongPress, onPress },
  radius,
  colorText,
  width,
  height,
  marginBottom,
  marginTop,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      activeOpacity={0.5}
      style={{
        backgroundColor: color,
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius,
        marginBottom: 0 || marginBottom,
        marginTop: 0 || marginTop,
      }}
    >
      <Text
        style={{
          color: colorText,
          fontFamily: 'Poppins',
          fontSize: 17,
          fontWeight: 'bold',
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default FancyButton;
