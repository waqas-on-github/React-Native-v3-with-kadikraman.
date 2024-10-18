import React from 'react';
import { Alert, Text, TouchableOpacity, Pressable, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { styles } from '../styles';
import { theme } from "../theme";
import * as Haptics from "expo-haptics";

type Props = {
    name: string;
    id: string;
    isCompleted?: boolean;
    onDelete: () => void;
    onToggleComplete: () => void;
};

export const ShoppingListItem = ({
    name,
    id,
    isCompleted,
    onDelete,
    onToggleComplete,
}: Props) => {
    const handleDelete = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        Alert.alert(
            'Delete Item?',
            'Are you sure you want to delete this item?',
            [
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: onDelete,
                },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    return (
        <Pressable
            style={[styles.itemContainer, isCompleted ? styles.completedItemContainer : undefined]}
            onPress={onToggleComplete}
        >
            <View style={styles.itemContent}>
                <Entypo
                    name={isCompleted ? "check" : "circle"}
                    size={24}
                    color={isCompleted ? theme.colors.colorGrey : theme.colors.colorCerulean}
                />
                {/* Text component for the item name */}
                <Text
                    style={[
                        styles.itemName,
                        isCompleted ? styles.completedItemName : undefined,
                    ]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {name} {/* The name must be inside a Text component */}
                </Text>
            </View>

            <TouchableOpacity
                style={[
                    styles.deleteButton,
                    isCompleted ? styles.completedDeleteButton : undefined,
                ]}
                onPress={handleDelete}
            >
                <AntDesign
                    name="closecircle"
                    size={24}
                    color={isCompleted ? theme.colors.colorWhite : theme.colors.colorRed}
                />
            </TouchableOpacity>
        </Pressable>
    );
};
