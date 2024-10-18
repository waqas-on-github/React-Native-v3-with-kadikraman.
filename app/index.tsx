import { FlatList, Text, TextInput, View, LayoutAnimation } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from '../styles';
import { ShoppingListItem } from '../components/ShoppingListItem';
import { getFromStorage, saveToStorage } from '../utils/storage';


const storageKey = 'shopping_list'

type ShoppingListItemsType = {
  id: string;
  name: string;
  completedAtTimeStamp?: number;
  lastUpdatedTimestamp: number;
};

export default function App() {
  const [text, setText] = useState('');
  const [shoppingList, setShoppingList] = useState<ShoppingListItemsType[]>([]);

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey)
      if (data) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setShoppingList(data)
      }
    }
    fetchInitial()
  }, [])


  const handleSubmit = () => {
    if (text) {
      const newShoppingList = [
        ...shoppingList,
        { id: new Date().toISOString(), name: text, lastUpdatedTimestamp: Date.now() },

      ];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setShoppingList(newShoppingList);
      saveToStorage(storageKey, shoppingList)
      setText('');
    }
  };

  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    saveToStorage(storageKey, shoppingList)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setShoppingList(newShoppingList);
  };

  const handleToggleComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completedAtTimeStamp: item.completedAtTimeStamp ? undefined : Date.now(),
          lastUpdatedTimestamp: Date.now()
        };
      }
      return item;
    });
    saveToStorage(storageKey, shoppingList)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setShoppingList(newShoppingList);
  };


  function orderShoppingList(shoppingList: ShoppingListItemsType[]) {
    return shoppingList.sort((item1, item2) => {
      if (item1.completedAtTimeStamp && item2.completedAtTimeStamp) {
        return item2.completedAtTimeStamp - item1.completedAtTimeStamp;
      }

      if (item1.completedAtTimeStamp && !item2.completedAtTimeStamp) {
        return 1;
      }

      if (!item1.completedAtTimeStamp && item2.completedAtTimeStamp) {
        return -1;
      }

      if (!item1.completedAtTimeStamp && !item2.completedAtTimeStamp) {
        return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
      }

      return 0;
    });
  }

  return (
    <FlatList
      data={orderShoppingList(shoppingList)}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={
        <TextInput
          style={styles.textInput}
          placeholder="Add item..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
      }
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          id={item.id}
          onDelete={() => handleDelete(item.id)}
          onToggleComplete={() => handleToggleComplete(item.id)}
          isCompleted={Boolean(item.completedAtTimeStamp)}
        />
      )}
    />
  );
}