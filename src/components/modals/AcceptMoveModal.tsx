import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, Dimensions} from 'react-native';
import {COLOR} from '../../../assets/colorTheme';
import {Button} from 'react-native-paper';
const {height} = Dimensions.get('window');
import {useAlbumsRequest} from '../../hooks/useAlbumsRequest';
import eventEmitter from '../../../assets/eventEmitter';

interface AcceptMoveModalProps {
  visible: boolean;
  onClose: () => void;
}

const AcceptMoveModal: React.FC<AcceptMoveModalProps> = ({
  visible,
  onClose,
}) => {
  const {deleteAllAlbums} = useAlbumsRequest();

  return (
    <>
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={onClose}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.textItem}>
              <Text style={styles.title}>
                Вы действительно хотите удалить все альбомы ?
              </Text>
              <View style={styles.topSpacer} />
              <Text style={styles.text}>
                Удаленные альбомы невозможно будет восстановить
              </Text>
            </View>
            <View style={styles.buttonsItem}>
              <Button
                style={styles.button}
                mode="contained"
                onPress={() => {
                  deleteAllAlbums(),
                    onClose(),
                    eventEmitter.emit('albumsUpdated'); // отправляем событие после удаления
                }}>
                Удалить
              </Button>
              <Button mode="contained" onPress={() => onClose()}>
                Отмена
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    height: height * 0.3,
    backgroundColor: COLOR.dark.SECONDARY_COLOR,
    padding: 20,
    borderRadius: 8,
  },
  topSpacer: {
    height: 20,
  },
  textItem: {},
  buttonsItem: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 40,
  },
  button: {
    marginHorizontal: 14,
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    color: COLOR.dark.TEXT_BRIGHT,
  },
  text: {
    textAlign: 'left',
    color: COLOR.dark.TEXT_DIM,
  },
});

export default AcceptMoveModal;
