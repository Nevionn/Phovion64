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
  Image,
} from 'react-native';
import {COLOR} from '../../assets/colorTheme';
import NaviBar from '../components/Navibar';
import Cbutton from '../components/Cbutton';
import {usePinCodeRequest} from '../hooks/usePinCodeRequest';
// import FastImage from 'react-native-fast-image';
import ImageViewer from '../components/ImageViewer';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import {Image as SvgImage} from 'react-native-svg';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const MainPage = () => {
  const {showTableContent, dropTable} = usePinCodeRequest();
  return (
    <View style={[styles.root, {backgroundColor: COLOR.MAIN_COLOR}]}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      {/* <ScrollView contentContainerStyle={styles.root}></ScrollView> */}
      <View>{/* <ImageViewer /> */}</View>
      <View style={styles.testBlock}>
        <Cbutton
          styleButton={{height: 40}}
          styleText={{}}
          colorButton={{backgroundColor: COLOR.BUTTON_COLOR}}
          isShadow={true}
          isVisible={true}
          name={'Проверить пинкод'}
          onPress={() => {
            showTableContent();
          }}
        />
        <Cbutton
          styleButton={{height: 40}}
          styleText={{}}
          colorButton={{backgroundColor: COLOR.BUTTON_COLOR}}
          isShadow={true}
          isVisible={true}
          name={'drop table'}
          onPress={() => {
            dropTable('PinCodeTable');
          }}
        />
      </View>
      <NaviBar />
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // photoItem: {
  //   backgroundColor: 'black',
  //   height: height * 0.5,
  //   width: width * 0.75,
  // },
  // zoomableView: {
  //   width: 300,
  //   height: 300,
  // },
  // photo: {
  //   width: '100%',
  //   height: '100%',
  // },
  text: {
    color: 'white',
    alignItems: 'center',
    fontSize: 18,
  },
  testBlock: {
    flexDirection: 'row',
    marginBottom: 100,
  },
});
