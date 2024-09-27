import React from "react";
import { View } from "react-native";
import ProductCardSceleton from "../product-card/card-sceleton/ProductCardSceleton";

const SearchProductsSceleton = () => {
  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          rowGap: 20,
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <ProductCardSceleton key={i} />
        ))}
      </View>
    </View>
  );
};

export default SearchProductsSceleton;
