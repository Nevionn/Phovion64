import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import NaviBarProps from '../types/NaviBarProps';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Polygon} from 'react-native-svg';
import SvgSettings from './icons/SvgSettings';

// import ModalSettings from './modalWindow/ModalSettings';

const NaviBar: React.FC<NaviBarProps> = () => {
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const openSettingsMenu = () => {
    setIsSettingsModalVisible(true);
  };

  const closeSettingsMenu = () => {
    setIsSettingsModalVisible(false);
  };

  const statusBarHeight: any = StatusBar.currentHeight;

  return (
    <>
      {/* <View style={[styles.navibar, {top: statusBarHeight - 5}]}>
        <LinearGradient
          colors={['#1f0241', '#670cfb', '#511cae']}
          style={styles.gradient}>
          <Svg height="100%" width="100%" style={styles.svgContainer}>
            <Polygon points="0,200 0,0 400,0" fill="#0051ff" opacity="1" />
            <Polygon points="200,400 0,0 400,0" fill="#7a00cc" opacity="0.7" />
            <Polygon points="0,400 200,400 0,200" fill="#9000d3" opacity="1" />
            <Polygon points="100,0 1000,400 100,100" fill="red" opacity="1" />
          </Svg>

          <TouchableOpacity
            onPress={() => console.log('t')}
            style={styles.touchArea}>
            <Text style={styles.textAddNewAlbum}>+</Text>
          </TouchableOpacity>
          <Text style={styles.textHead}>Альбомы</Text>
          <TouchableOpacity
            onPress={() => openSettingsMenu()}
            style={styles.touchArea}>
            <SvgSettings />
          </TouchableOpacity>
        </LinearGradient>
      </View> */}
      {/* <ModalSettings
        isVisible={isSettingsModalVisible}
        onClose={closeSettingsMenu}
      /> */}
      <View style={[styles.navibar, {top: statusBarHeight - 5}]}>
        <ImageBackground
          source={require('../../assets/images/navibar.png')}
          style={styles.backgroundImage}>
          <TouchableOpacity
            onPress={() => console.log('t')}
            style={styles.touchArea}>
            <Text style={styles.textAddNewAlbum}>+</Text>
          </TouchableOpacity>
          <Text style={styles.textHead}>Альбомы</Text>
          <TouchableOpacity
            onPress={() => openSettingsMenu()}
            style={styles.touchArea}>
            <SvgSettings />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navibar: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    width: '100%',
    zIndex: 10,
  },
  textHead: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textAddNewAlbum: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  textAlbum: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    marginLeft: 14,
  },
  touchArea: {
    backgroundColor: 'transparent',
    padding: 8,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  // gradient: {
  //   flex: 1,
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  // },
  // svgContainer: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  // },
});

export default NaviBar;
