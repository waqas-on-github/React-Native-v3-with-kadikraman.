import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { intervalToDuration, isBefore } from "date-fns";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TimeSegment } from "../../components/TimeSegment";
import { getFromStorage, saveToStorage } from "../../utils/storage";

// 10 seconds from now
const timestamp = Date.now() + 10 * 1000;

const oneDay = 24 * 60 * 60 * 1000;
const oneHour = 60 * 60 * 1000;
const oneMinute = 60 * 1000;
const oneSecond = 1 * 1000;

type CountdownStatus = {
    isOverdue: boolean;
    distance: ReturnType<typeof intervalToDuration>;
};

export default function CounterScreen() {
    const [status, setStatus] = useState<CountdownStatus>({
        isOverdue: false,
        distance: {},
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            const isOverdue = isBefore(timestamp, Date.now());

            const distance = intervalToDuration(
                isOverdue
                    ? { end: Date.now(), start: timestamp }
                    : { start: Date.now(), end: timestamp }
            );

            setStatus({ isOverdue, distance });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const scheduleNotification = async () => {
        await registerForPushNotificationsAsync();
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Reminder",
                body: "This is your scheduled notification!",
            },
            trigger: { seconds: 2 },
        });
    };

    return (
        <View
            style={[
                styles.container,
                status.isOverdue ? styles.containerLate : undefined,
            ]}
        >
            {!status.isOverdue ? (
                <Text style={styles.heading}>Thing due in</Text>
            ) : (
                <Text style={[styles.heading, styles.whiteText]}>
                    Thing overdue by
                </Text>
            )}
            <View style={styles.row}>
                <TimeSegment
                    unit="Days"
                    number={status.distance?.days ?? 0}
                    textStyle={status.isOverdue ? styles.whiteText : undefined}
                />
                <TimeSegment
                    unit="Hours"
                    number={status.distance?.hours ?? 0}
                    textStyle={status.isOverdue ? styles.whiteText : undefined}
                />
                <TimeSegment
                    unit="Minutes"
                    number={status.distance?.minutes ?? 0}
                    textStyle={status.isOverdue ? styles.whiteText : undefined}
                />
                <TimeSegment
                    unit="Seconds"
                    number={status.distance?.seconds ?? 0}
                    textStyle={status.isOverdue ? styles.whiteText : undefined}
                />
            </View>
            <TouchableOpacity
                onPress={scheduleNotification}
                style={styles.button}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>I've done the thing!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.colorWhite,
    },
    button: {
        backgroundColor: theme.colors.colorBlack,
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: theme.colors.colorWhite,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    row: {
        flexDirection: "row",
        marginBottom: 24,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        color: theme.colors.colorBlack,
    },
    containerLate: {
        backgroundColor: theme.colors.colorRed,
    },
    whiteText: {
        color: theme.colors.colorWhite,
    },
});
