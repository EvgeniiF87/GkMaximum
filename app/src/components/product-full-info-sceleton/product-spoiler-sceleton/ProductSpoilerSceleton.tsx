import React from "react";
import { View } from "react-native";
import Sceleton from "../../sceleton/Sceleton";

const ProductSpoilerSceleton = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      <Sceleton width={160} height={30} borderRadius={2} />
      <Sceleton width={26} height={30} borderRadius={2} />
    </View>
  );
};

export default ProductSpoilerSceleton;
