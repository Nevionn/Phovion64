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
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {usePhotoRequest} from '../hooks/usePhotoRequest';
import {COLOR} from '../../assets/colorTheme';
import eventEmitter from '../../assets/eventEmitter';
import {useNavigation, useRoute} from '@react-navigation/native';
import NavibarPhoto from '../components/NavibarPhoto';
import ImageViewer from '../components/ImageViewer';
import {Button} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';
import {Buffer} from 'buffer';

interface Photo {
  id: number;
  album_id: number;
  title: string;
  photo: any;
  created_at: string;
}

const PhotoPage = () => {
  const {addPhoto, getPhoto, deleteAllPhotos, dropTable, showSheme} =
    usePhotoRequest();

  const route: any = useRoute();
  const dataAlbum = route?.params;

  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isVisibleImageViewer, setIsVisibleImageViewer] = useState(false);

  const [photos, setPhotos] = useState<Photo[]>([]);

  const [infoAboutPhoto, setInfoAboutPhoto] = useState({
    imageSource: '',
    countAllImages: 0,
    countPhoto: 0,
    idPhoto: 0,
    idAlbum: 0,
  });

  const openImageViewer = (src: string, count: number, id: number) => {
    const photoObject = {
      imageSource: src,
      countAllImages: photos.length,
      countPhoto: count,
      idPhoto: id,
      idAlbum: dataAlbum.album.id,
    };
    setInfoAboutPhoto(photoObject);
    setIsVisibleImageViewer(true);
  };

  const closeImageViewer = () => {
    setIsVisibleImageViewer(false);
  };

  useEffect(() => {
    const updatePhotos = () => {
      getPhoto(dataAlbum.album.id, setPhotos);
    };

    updatePhotos();
    eventEmitter.on('photosUpdated', updatePhotos);

    return () => {
      eventEmitter.off('photosUpdated', updatePhotos);
    };
  }, []);

  const styles = getStyles(isDarkTheme);
  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.topSpacer} />
      {photos.length > 0 ? (
        <React.Fragment>
          <FlatList
            data={photos}
            numColumns={3}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.placeHolder}
                onPress={() => openImageViewer(item.photo, index + 1, item.id)}>
                <FastImage
                  source={{uri: `data:image/jpeg;base64,${item.photo}`}}
                  style={styles.image}
                />
              </TouchableOpacity>
            )}
          />
        </React.Fragment>
      ) : (
        <View style={styles.emptyDataItem}>
          <Text>Тут пусто</Text>
        </View>
      )}
      <NavibarPhoto
        titleAlbum={dataAlbum.album.title}
        idAlbum={dataAlbum.album.id}
      />
      <View>
        <ImageViewer
          visible={isVisibleImageViewer}
          onCloseImgViewer={closeImageViewer}
          infoAboutPhoto={infoAboutPhoto}
        />
      </View>
    </View>
  );
};

const getStyles = (isDarkTheme: boolean) => {
  return StyleSheet.create({
    root: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingBottom: 62,
      backgroundColor: isDarkTheme
        ? COLOR.dark.MAIN_COLOR
        : COLOR.light.MAIN_COLOR,
    },
    topSpacer: {
      height: '19%',
    },
    placeHolder: {
      margin: 2,
      height: 120,
      width: Dimensions.get('window').width / 3 - 4, // Расчет ширины для 3 элементов в ряд
      aspectRatio: 1, // Поддерживает квадратную форму
    },
    image: {
      height: '100%',
      width: '100%',
      borderRadius: 10,
    },
    emptyDataItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default PhotoPage;
