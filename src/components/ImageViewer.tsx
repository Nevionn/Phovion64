import React, {useState, useEffect} from 'react';
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
import EditPhotoMiniModal from './modals/EditPhotoMiniModal';
import {IconButton} from 'react-native-paper';
import SvgDotsVertical from './icons/SvgDotsVertical';
import SvgLeftArrow from './icons/SvgLeftArrow';

const {width, height} = Dimensions.get('window');

interface ImageViewerProps {
  visible: boolean;
  onCloseImgViewer: () => void;
  infoAboutPhoto: {
    imageSource: string;
    countAllImages: number;
    countPhoto: number;
    idPhoto: number;
    idAlbum: number;
  };
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  visible,
  onCloseImgViewer,
  infoAboutPhoto,
}) => {
  const [isMiniModalVisible, setIsMiniModalVisible] = useState(false);

  const handleOpenMiniModal = () => {
    setIsMiniModalVisible(true);
  };

  const handleCloseMiniModal = () => {
    setIsMiniModalVisible(false);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => onCloseImgViewer()}>
      <View style={styles.modalContainer}>
        <View style={styles.infoBar}>
          <IconButton
            icon={() => <SvgLeftArrow />}
            size={30}
            onPress={() => onCloseImgViewer()}
          />
          <Text
            style={
              styles.infoText
            }>{`${infoAboutPhoto.countPhoto} из ${infoAboutPhoto.countAllImages} айди фото ${infoAboutPhoto.idPhoto}`}</Text>
          <IconButton
            icon={() => <SvgDotsVertical />}
            size={30}
            onPress={() => handleOpenMiniModal()}
          />
        </View>

        <ReactNativeZoomableView
          maxZoom={2.5}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          style={styles.imgView}>
          <FastImage
            style={styles.image}
            source={{
              uri: `data:image/jpeg;base64,${infoAboutPhoto.imageSource}`,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </ReactNativeZoomableView>
      </View>
      <EditPhotoMiniModal
        visible={isMiniModalVisible}
        onCloseEditModal={handleCloseMiniModal}
        onCloseImgViewer={onCloseImgViewer}
        idPhoto={infoAboutPhoto.idPhoto}
        idAlbum={infoAboutPhoto.idAlbum}
      />
    </Modal>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,1)',
    position: 'relative',
  },
  infoBar: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    zIndex: 10,
    height: 60,
    width: '100%',
    backgroundColor: 'transparent',
  },
  infoText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  imgView: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height - 60, // Высота экрана за вычетом плашки
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    position: 'absolute',
    right: 10,
    top: 50, // Здесь задается примерная позиция
  },
  modalItem: {
    padding: 10,
    fontSize: 16,
    color: 'black',
  },
});
