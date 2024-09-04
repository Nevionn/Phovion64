import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import CButtonProps from '../types/CButtonProps';

const Cbutton: React.FC<CButtonProps> = ({
  name,
  styleButton,
  colorButton,
  styleText,
  isDisabled,
  isShadow,
  isVisible,
  onPress,
}) => {
  return (
    <>
      {isVisible && (
        <TouchableOpacity
          style={{
            ...styles.customButton,
            ...styleButton,
            ...colorButton,
            ...(isShadow
              ? {
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }
              : null),
          }}
          disabled={isDisabled}
          onPress={onPress}>
          <Text
            style={{
              ...styles.customText,
              ...styleText,
            }}>
            {name}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  customButton: {
    height: 10,
    width: null,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    margin: 6,
    borderRadius: 25,
    borderWidth: 0,
    backgroundColor: 'red',
    borderColor: 'green',
  },
  customText: {
    fontSize: 14,
    fontFamily: 'Futura',
    textAlign: 'center',
    color: 'white',
    textDecorationLine: 'none',
    marginRight: 0,
    marginLeft: 0,
  },
});

export default Cbutton;
