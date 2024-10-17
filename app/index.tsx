
import { ScrollView, TextInput } from 'react-native';
import { styles } from '../styles';
import { ShoppingListItem } from '../components/ShoppingListItem';
import { useState } from 'react';



type ShoppingListItemsType = {
  id: string,
  name: string

}

const initialValue: ShoppingListItemsType[] = [

  { id: '1', name: 'Coffe' },
  { id: '2', name: 'Tea' },
  { id: '3', name: 'Milk ' },
  { id: '4', name: 'Water' },
] 

export default function App() {

  const [text, setText] = useState('')
  const [ShoppingList, setShoppingList] = useState<ShoppingListItemsType[]>(initialValue)

  const handleSubmit = () => {
    if (text) {

      const newShoppingList = [
        ...ShoppingList,
        { id: new Date().toISOString(), name: text }

      ]
      setShoppingList(newShoppingList)
      setText('')

    }
  }


  const handleDelete = () => {


  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contenteContainer} stickyHeaderIndices={[0]} >
      <TextInput

        style={styles.textInput}
        placeholder='Coffe etc ...'
        value={text}
        onChangeText={(value) => setText(value)}
        returnKeyType='done'
        onSubmitEditing={handleSubmit}
      // keyboardType=''  you can add keyboard type 

      />

      {ShoppingList.map((item) => {
        return <ShoppingListItem name={item.name} key={item.id} />

      })}



    </ScrollView>
  );
}



