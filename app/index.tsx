
import { View } from 'react-native';
import { styles } from '../styles';
import { ShoppingListItem } from '../components/ShoppingListItem';
import { Link } from 'expo-router';

export default function App() {


  return (
    <View style={styles.container}>
      <Link href='/counter' style={{ textAlign: 'center', fontStyle: "italic", marginBottom: 18, fontWeight: "bold" }} >Go to counter</Link>
      <ShoppingListItem name='Coffe' />
      <ShoppingListItem name='Tea' isCompleted={true} />
      <ShoppingListItem name='water' isCompleted={true} />



    </View>
  );
}



