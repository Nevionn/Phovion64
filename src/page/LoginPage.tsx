import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import {COLOR} from '../../assets/colorTheme';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
import Cbutton from '../components/Cbutton';
import PinCode from '../components/PinCode';

const LoginPage = () => {
  const [pin, setPin] = useState<string | undefined>('1234');

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.greetingsItem}>
        {/* <Text style={styles.text}>Добро пожаловать в защищенную галлерею</Text>
        <Cbutton
          styleButton={styles.startButton}
          colorButton={{backgroundColor: COLOR.BUTTON_COLOR}}
          isShadow={true}
          isVisible={true}
          name={'Начать'}
          onPress={() => {
            console.log('go');
          }}
        /> */}
        <PinCode />
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.MAIN_COLOR,
  },
  greetingsItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.SECONDARY_COLOR,
    height: height * 0.75,
    width: width * 0.75,
  },
  startButton: {
    height: 38,
    width: 110,
    borderRadius: 20,
    position: 'absolute',
    bottom: 10,
  },

  text: {
    color: 'white',
    alignItems: 'center',
    fontSize: 18,
  },
});
