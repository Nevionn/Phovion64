import {
  launchImageLibrary,
  launchCamera,
  CameraOptions,
} from 'react-native-image-picker';
import eventEmitter from './eventEmitter';

interface AddPhotoParams {
  album_id: string;
  title: string | undefined;
  photo: string;
  created_at: string;
}

interface CameraPhotoResult {
  uri?: string;
  base64?: string;
  fileName?: string;
  type?: string;
}

export const pickImage = async (
  idAlbum: string,
  addPhoto: (photo: AddPhotoParams) => void,
) => {
  try {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });

    if (result.assets && result.assets.length > 0) {
      const {base64, fileName} = result.assets[0];

      if (base64) {
        addPhoto({
          album_id: idAlbum,
          title: fileName,
          photo: base64,
          created_at: new Date().toLocaleString(),
        });
        eventEmitter.emit('photosUpdated');
        eventEmitter.emit('albumsUpdated');
      }
    }
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error);
  }
};

export const capturePhoto = async (
  idAlbum: string,
  addPhoto: (photo: AddPhotoParams) => void,
): Promise<CameraPhotoResult | null> => {
  const options: CameraOptions = {
    mediaType: 'photo',
    cameraType: 'back',
    saveToPhotos: false,
    includeBase64: true,
    quality: 0.8,
  };

  try {
    const result = await launchCamera(options);

    if (result.didCancel) {
      console.log('Отмена съемки');
      return null;
    }

    if (result.errorCode) {
      console.error('Ошибка камеры: ', result.errorMessage);
      return null;
    }

    const photo = result.assets ? result.assets[0] : null;

    if (photo && photo.base64) {
      console.log('Снятое фото: ', photo.uri);

      addPhoto({
        album_id: idAlbum,
        title: photo.fileName,
        photo: photo.base64,
        created_at: new Date().toLocaleString(),
      });

      eventEmitter.emit('photosUpdated');
      eventEmitter.emit('albumsUpdated');
    } else {
      console.log('Base64 отсутствует у снимка');
    }

    return photo;
  } catch (error) {
    console.error('Ошибка при открытии камеры: ', error);
    return null;
  }
};
