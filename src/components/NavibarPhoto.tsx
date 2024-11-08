import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SvgLeftArrow from './icons/SvgLeftArrow';
import SvgDotsVertical from './icons/SvgDotsVertical';
import NaviBarPhotoProps from '../types/NaviBarPhotoProps';
import {IconButton} from 'react-native-paper';

const NavibarPhoto: React.FC<NaviBarPhotoProps> = ({}) => {
  const navigation: any = useNavigation();
  const statusBarHeight: any = StatusBar.currentHeight;

  return (
    <>
      <View style={[styles.navibar, {top: statusBarHeight - 5}]}>
        <View style={styles.manipulationItem}>
          <IconButton
            icon={() => <SvgLeftArrow />}
            size={30}
            onPress={() => navigation.goBack()}
          />
          <IconButton
            icon={() => <SvgDotsVertical />}
            size={30}
            onPress={() => console.log('Pressed')}
          />
        </View>
        <View style={styles.titleAlbumItem}>
          <Text style={styles.title}>Test</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navibar: {
    flexDirection: 'column',
    marginTop: 8,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    width: '100%',
    zIndex: 10,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  manipulationItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    width: '100%',
    height: '60%',
    backgroundColor: 'transparent',
  },
  titleAlbumItem: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: '40%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'medium',
    marginLeft: 24,
  },
  touchArea: {
    backgroundColor: 'transparent',
    padding: 8,
  },
});

export default NavibarPhoto;
