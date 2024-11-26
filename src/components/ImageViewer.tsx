import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';

const {width, height} = Dimensions.get('window');

interface ImageViewerProps {
  //   visible: boolean;
  //   onClose: () => void;
  //   imageSource: any;
}

const ImageViewer: React.FC<ImageViewerProps> = (
  {
    //   visible,
    //   onClose,
    //   imageSource,
  },
) => {
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {}}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => {}}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>

        <View style={styles.imgView}>
          <ReactNativeZoomableView
            maxZoom={2.5}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            style={styles.imgView}>
            <FastImage
              style={styles.image}
              source={require('../../assets/images/EHHttyOYx_Y.jpg')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </ReactNativeZoomableView>
          {/* <Video
            source={require('../../assets/images/test.mp4')}
            style={styles.media}
            resizeMode="contain"
            controls={true} // Элементы управления видео
            repeat={true}
          /> */}
        </View>
      </View>
    </Modal>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)', // Полупрозрачный черный фон
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 1, // Окно для изображения
    width: width * 1,
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeText: {
    color: 'white',
    fontSize: 18,
  },
});
