

import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync"
import * as Notifications from "expo-notifications";

export default function CounterScreen() {

    const secduleNotification = async () => {
        const result = await registerForPushNotificationsAsync();

        if (result === "granted") {
            const result = await Notifications.scheduleNotificationAsync({
                content: {
                    title: "im notification from plantly"
                },
                trigger: {
                    seconds: 5,
                }
            })

            console.log(result);

        } else {
            Alert.alert(
                "Unable  to secdule notification",
                "Enable the notifications permission for Expo Go in settings"
            )
        }
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={secduleNotification}
                style={styles.button}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>Schedule notification</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: theme.colors.colorBlack,
        padding: 12,
        borderRadius: 6,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
    },

});
