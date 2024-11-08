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
import {COLOR} from '../../assets/colorTheme';
import NavibarPhoto from '../components/NavibarPhoto';

interface Photo {
  id: string;
}

const PhotoPage = () => {
  const [photos, setPhotos] = useState<Photo[]>([
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'},
    {id: '6'},
    {id: '7'},
    {id: '8'},
  ]);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const styles = getStyles(isDarkTheme);
  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.topSpacer} />
      <FlatList
        data={photos}
        numColumns={3}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.placeHolder}
            onPress={() => console.log('test')}>
            <Image
              source={require('../../assets/images/EHHttyOYx_Y.jpg')}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
      />
      <NavibarPhoto goBack={() => console.log()} />
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
    textNameAlbum: {
      fontSize: 14,
      color: isDarkTheme ? 'white' : 'black',
    },
    textCountPhoto: {
      fontSize: 12,
      color: isDarkTheme ? '#ACACAC' : 'grey',
    },
    testBlock: {
      justifyContent: 'center',
      flexDirection: 'row',
      marginBottom: 200,
    },
  });
};

export default PhotoPage;
