import React from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../styles'

export const ShoppingListItem = ({ name, isCompleted }: { name: string, isCompleted?: boolean }) => {

    const handleDelete = () => {
        Alert.alert("wannna delete this?", "this wii be for good ",
            [
                {
                    text: "yes",
                    onPress: () => {
                        console.log('deleting ...')
                    },
                    style: 'destructive'
                },
                {
                    text: 'cancel',
                    style: "cancel"
                }
            ]
        )
    }
    return (
        <View style={[styles.itemContainer, isCompleted ? styles.completeContainer : undefined]} >
            <Text style={[styles.textContainer, isCompleted ? styles.completeTextContainer : undefined]} >{name}!</Text>
            <TouchableOpacity style={[styles.button, isCompleted ? styles.completedButton : undefined]} onPress={handleDelete} activeOpacity={0.8} >
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}
