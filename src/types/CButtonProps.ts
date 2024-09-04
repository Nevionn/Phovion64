import {TextStyle, ViewStyle, TouchableOpacityProps} from 'react-native';
interface CButtonProps {
  name: string; // Текст, отображаемый на кнопке
  styleButton?: ViewStyle; // Стили для кнопки
  colorButton?: ViewStyle; // Цвет кнопки (или стили, связанные с цветом)
  styleText?: TextStyle; // Стили для текста на кнопке
  isDisabled?: boolean; // Определяет, отключена ли кнопка
  isShadow?: boolean; // Определяет, будет ли у кнопки тень
  isVisible?: boolean; // Определяет, видима ли кнопка
  onPress?: TouchableOpacityProps['onPress']; // Функция, которая вызывается при нажатии на кнопку
}

export default CButtonProps;
