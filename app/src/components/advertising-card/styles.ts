import { StyleSheet, Platform, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  wrap: {
    // flex: 1,
    // marginTop: 40,
    borderRadius: 20,
    width: Dimensions.get("window").width - 40,
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    ...Platform.select({
      android: { overflow: "hidden", borderColor: "#B1AEAE", borderWidth: 0.4 },
    }),
  },
  header: {
    padding: 10,
  },
  title: {
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    width: "80%",
  },
  body: {
    height: 160,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    flex: 1,
    width: 380,
    height: 400,
    resizeMode: "stretch",
  },
});
