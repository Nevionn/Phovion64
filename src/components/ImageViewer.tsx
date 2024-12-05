import React, {useState, useEffect} from 'react';
import {Modal, StyleSheet, Text, View, Dimensions} from 'react-native';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import EditPhotoMiniModal from './modals/EditPhotoMiniModal';
import {IconButton} from 'react-native-paper';
import SvgDotsVertical from './icons/SvgDotsVertical';
import SvgLeftArrow from './icons/SvgLeftArrow';

const {width, height} = Dimensions.get('window');
const INFOBAR_HEIGHT = 60;

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
  const [imageDimensions, setImageDimensions] = useState({width: 1, height: 1});

  const handleOpenMiniModal = () => setIsMiniModalVisible(true);
  const handleCloseMiniModal = () => setIsMiniModalVisible(false);

  const handleImageLoad = (event: any) => {
    const {width: imgWidth, height: imgHeight} = event.nativeEvent;
    setImageDimensions({width: imgWidth, height: imgHeight});
  };

  const aspectRatio = imageDimensions.width / imageDimensions.height;

  const contentWidth = width;
  const contentHeight = Math.min(width / aspectRatio, height - INFOBAR_HEIGHT);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCloseImgViewer}>
      <View style={styles.modalContainer}>
        <View style={styles.infoBar}>
          <IconButton
            icon={() => <SvgLeftArrow />}
            size={30}
            onPress={onCloseImgViewer}
          />
          <Text style={styles.infoText}>
            {`${infoAboutPhoto.countPhoto} из ${infoAboutPhoto.countAllImages}`}
          </Text>
          <IconButton
            icon={() => <SvgDotsVertical />}
            size={30}
            onPress={handleOpenMiniModal}
          />
        </View>

        <View style={styles.zoomableViewContainer}>
          <ReactNativeZoomableView
            maxZoom={2.5}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            contentWidth={contentWidth}
            contentHeight={contentHeight}>
            <FastImage
              style={{width: contentWidth, height: contentHeight}}
              source={{
                uri: `data:image/jpeg;base64,${infoAboutPhoto.imageSource}`,
              }}
              resizeMode={FastImage.resizeMode.contain}
              onLoad={handleImageLoad}
            />
          </ReactNativeZoomableView>
        </View>
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
    backgroundColor: 'black',
  },
  infoText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  zoomableViewContainer: {
    flex: 1,
    marginTop: INFOBAR_HEIGHT,
  },
});
