import React, {useState, useEffect, useCallback} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {COLOR} from '../../assets/colorTheme';
import NaviBar from '../components/Navibar';

const MainPage = () => {
  return (
    <View style={[styles.root, {backgroundColor: COLOR.MAIN_COLOR}]}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <ScrollView contentContainerStyle={styles.root}></ScrollView>
      <NaviBar />
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
  text: {
    color: 'white',
    alignItems: 'center',
    fontSize: 18,
  },
});
