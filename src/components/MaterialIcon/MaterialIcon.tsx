import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type IconProps = {
  name: string;
  size: number;
  color: string;
  onPress?: () => void; // Opcional para manejar acciones al presionar
};

export default function MaterialIcon({name, size, color, onPress}: IconProps) {
  return (
    <MaterialCommunityIcons
      name={name}
      color={color}
      size={size}
      onPress={onPress} // Usa la prop `onPress` directamente
    />
  );
}
