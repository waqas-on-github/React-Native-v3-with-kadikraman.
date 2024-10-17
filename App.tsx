
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from './theme';
import { styles } from './styles';
import { ShoppingListItem } from './components/ShoppingListItem';

export default function App() {




  return (
    <View style={styles.container}>
      <ShoppingListItem name='Coffe' />
      <ShoppingListItem name='Tea' isCompleted={true} />
      <ShoppingListItem name='water' isCompleted={true} />



    </View>
  );
}



