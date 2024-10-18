import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.colorWhite,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.colorCerulean,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completedItemContainer: {
    backgroundColor: theme.colors.colorGreyLte,
    borderBottomColor: theme.colors.colorGreyLte,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    marginLeft: 8,
    flex: 1,
  },
  completedItemName: {
    textDecorationLine: "line-through",
    color: theme.colors.colorGrey,
  },
  deleteButton: {
    padding: 8,
  },
  completedDeleteButton: {
    backgroundColor: theme.colors.colorGrey,
  },
  listEmptyContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  textInput: {
    borderColor: theme.colors.colorGreyLte,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    margin: 16,
    fontSize: 16,
    backgroundColor: theme.colors.colorWhite, // Added background color for better visibility
  },
});
