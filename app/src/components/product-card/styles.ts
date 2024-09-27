import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapCard: {
    maxWidth: 160,
    maxHeight: 253,
    minHeight: 253,
    marginHorizontal: 8,
  },
  imgWrap: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  favoritesBtn: {
    position: "absolute",
    top: 12,
    right: 8,
    zIndex: 1,
  },
  imgContent: {
    overflow: "hidden",
    maxWidth: 160,
    maxHeight: 176,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    flex: 1,
    width: 160,
    height: 176,
    resizeMode: "contain",
  },
  info: {
    maxHeight: 57,
    minHeight: 57,
    maxWidth: 160,
    marginTop: 8,
    justifyContent: "space-between",
  },
});
