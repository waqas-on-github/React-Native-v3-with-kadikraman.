
import { FlatList, Text, TextInput, View } from 'react-native';
import { styles } from '../styles';
import { ShoppingListItem } from '../components/ShoppingListItem';
import { useState } from 'react';



type ShoppingListItemsType = {
  id: string,
  name: string

}



export default function App() {

  const [text, setText] = useState('')
  const [ShoppingList, setShoppingList] = useState<ShoppingListItemsType[]>([])

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

    <FlatList
      data={ShoppingList}
      style={styles.container}
      contentContainerStyle={styles.contenteContainer}
      stickyHeaderIndices={[0]}

      ListHeaderComponent={
        <TextInput
        style={styles.textInput}
        placeholder='Coffe etc ...'
        value={text}
        onChangeText={(value) => setText(value)}
        returnKeyType='done'
        onSubmitEditing={handleSubmit}
      // keyboardType=''  you can add keyboard type 
        />}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer} >
          <Text  > your shopping list is empty</Text>
        </View>
      }
      renderItem={(item) => <ShoppingListItem name={item.item.name} />}

    />




  )
}



