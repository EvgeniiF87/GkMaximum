import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    borderColor: "rgb(137, 142, 159, 0.80)",
    borderBottomWidth: 0.2,
    paddingHorizontal: 20,
    ...Platform.select({
      android: { marginTop: 40 },
      ios: { marginTop: 15 },
    }),
  },
  search: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "90%",
    paddingVertical: 10,
    fontSize: 18,
  },
  button: {
    width: "20%",
  },
});
