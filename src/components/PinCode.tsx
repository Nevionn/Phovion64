import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface PinInputProps {
  length?: number;
  onComplete?: (pin: string) => void;
  inputStyle?: StyleProp<TextStyle>;
}

const PinCode: React.FC<PinInputProps> = ({
  length = 4,
  onComplete,
  inputStyle,
}) => {
  //   const [pin, setPin] = useState<string[]>

  const handleDelete = () => {};

  return (
    <View style={[styles.container]}>
      {/* <View style={styles.pinContainer}>
        {pin.map((value, index) => (
          <View key={index} style={[styles.pin, inputStyle]}>
            <Text style={styles.pinText}>{value ? '*' : ''}</Text>
          </View>
        ))}
      </View> */}
      <View style={styles.buttonContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0].map((digit, index) =>
          digit === null ? (
            <View
              key={`empty-${index}`} // уникальные ключи для пустых элементов
              style={[styles.button, {opacity: 0}]}
            />
          ) : (
            <TouchableOpacity
              key={`digit-${digit}-${index}`} // уникальные ключи для кнопок
              style={styles.button}
              onPress={() => console.log(digit)}>
              <Text style={styles.buttonText}>{digit}</Text>
            </TouchableOpacity>
          ),
        )}
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>⌫</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gold',
    width: '86%',
  },
  //   pinContainer: {
  //     flexDirection: 'row',
  //     marginBottom: 20,
  //   },
  pin: {
    // width: 40,
    // height: 40,
    // borderBottomWidth: 2,
    // borderColor: '#000',
    // marginHorizontal: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  pinText: {
    fontSize: 24,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: 'black',
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#ddd',
    margin: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
  },
});
// ⌫
export default PinCode;
