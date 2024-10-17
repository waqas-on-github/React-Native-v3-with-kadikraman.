import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },

  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCerulean,
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completeContainer: {
    backgroundColor: theme.colorGreyLte,
    borderBottomColor: theme.colorGreyLte,
  },
  textContainer: {
    fontSize: 18,
    fontWeight: "400",
  },
  completeTextContainer: {
    textDecorationLine: "line-through",
    color: theme.colorGrey,
  },

  completedButton: {
    backgroundColor: theme.colorGrey,
  },
  button: {
    borderRadius: 16,
    backgroundColor: theme.colorBlack,
    padding: 8,
  },
  buttonText: {
    color: theme.colorWhite,
    letterSpacing: 2,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
