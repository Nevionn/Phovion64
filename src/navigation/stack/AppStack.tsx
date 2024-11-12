import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPageScreen from '../screens/MainPageScreen';
import RegistrationPageScreen from '../screens/RegistrationPageScreen';
import LoginPageScreen from '../screens/LoginPageScreen';
import PhotoPageScreen from '../screens/PhotoPageScreen';
import {usePinCodeRequest} from '../../hooks/usePinCodeRequest';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const {checkActivePinCode} = usePinCodeRequest();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    checkActivePinCode((isActive: boolean, isSkip: boolean) => {
      if (isActive) {
        setInitialRoute('LoginPage');
      } else if (isSkip) {
        setInitialRoute('MainPage');
      } else {
        setInitialRoute('RegistrationPage');
      }
    });
  }, []);

  if (!initialRoute) {
    return (
      <View style={style.loadItem}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute} // Устанавливаем маршрут после проверки
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="RegistrationPage"
        component={RegistrationPageScreen}
      />
      <Stack.Screen name="LoginPage" component={LoginPageScreen} />
      <Stack.Screen name="MainPage" component={MainPageScreen} />
      <Stack.Screen name="PhotoPage" component={PhotoPageScreen} />
    </Stack.Navigator>
  );
};

const style = StyleSheet.create({
  loadItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppStack;
