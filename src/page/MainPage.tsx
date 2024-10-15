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
} from 'react-native';
import {COLOR} from '../../assets/colorTheme';
import NaviBar from '../components/Navibar';
import Cbutton from '../components/Cbutton';
import {usePinCodeRequest} from '../hooks/usePinCodeRequest';
import ImageViewer from '../components/ImageViewer';
import {Image as SvgImage} from 'react-native-svg';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

interface Album {
  id: string;
  title: string;
  img: string;
}
const albums: Album[] = [
  // {id: '1', title: 'Item 1', img: 'https://via.placeholder.com/150'},
  // {id: '2', title: 'Item 2', img: 'https://via.placeholder.com/150'},
  // {id: '3', title: 'Item 3', img: 'https://via.placeholder.com/150'},
  // {id: '4', title: 'Item 4', img: 'https://via.placeholder.com/150'},
  // {id: '5', title: 'Item 5', img: 'https://via.placeholder.com/150'},
  // {id: '6', title: 'Item 6', img: 'https://via.placeholder.com/150'},
  // {id: '7', title: 'Item 7', img: 'https://via.placeholder.com/150'},
  // {id: '8', title: 'Item 8', img: 'https://via.placeholder.com/150'},
  // {id: '9', title: 'Item 9', img: 'https://via.placeholder.com/150'},
];

const MainPage: React.FC = () => {
  const {showTableContent, dropTable} = usePinCodeRequest();

  const renderItem = ({item}: {item: Album}) => (
    <View style={styles.item}>
      <Image source={{uri: item.img}} style={styles.image} />
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  return (
    <View style={[styles.root, {backgroundColor: COLOR.MAIN_COLOR}]}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.topSpacer} />
      <FlatList
        data={albums}
        renderItem={renderItem}
        keyExtractor={(item: Album) => item.id}
        numColumns={2}
        contentContainerStyle={styles.container}
      />

      {/* <View>
        <ImageViewer />
      </View> */}
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
  },
  topSpacer: {
    height: '12%',
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  item: {
    backgroundColor: '#ccc',
    flex: 1,
    margin: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    alignItems: 'center',
    fontSize: 18,
  },
  testBlock: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 200,
  },
});
