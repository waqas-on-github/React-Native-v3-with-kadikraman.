
import { View } from 'react-native';
import { styles } from '../styles';
import { ShoppingListItem } from '../components/ShoppingListItem';


export default function App() {


  return (
    <View style={styles.container}>

      <ShoppingListItem name='Coffe' />
      <ShoppingListItem name='Tea' isCompleted={true} />
      <ShoppingListItem name='water' isCompleted={true} />



    </View>
  );
}



