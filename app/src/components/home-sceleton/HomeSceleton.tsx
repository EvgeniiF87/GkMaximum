import { View, Dimensions } from "react-native";
import Sceleton from "../sceleton/Sceleton";
import ProductCardSceleton from "../product-card/card-sceleton/ProductCardSceleton";

const { width, height } = Dimensions.get("window");

const HomeSceleton = () => {
  return (
    <View>
      <View style={{ alignItems: "center", paddingVertical: 10 }}>
        <Sceleton width={width - 40} height={40} borderRadius={8} />
      </View>

      <View
        style={{
          borderColor: "rgb(137, 142, 159, 0.80)",
          borderTopWidth: 0.2,
          borderBottomWidth: 0.2,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
      >
        <Sceleton
          width={width - 40}
          height={(height / 100) * 26}
          borderRadius={20}
        />
      </View>

      <View
        style={{
          borderColor: "rgb(137, 142, 159, 0.80)",
          borderBottomWidth: 0.2,
        }}
      >
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <Sceleton width={width - 40} height={40} borderRadius={8} />
        </View>
        <View style={{ flex: 1 }}>
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
            {[...Array(2)].map((_, i) => (
              <ProductCardSceleton key={i} />
            ))}
          </View>
        </View>
      </View>

      <View
        style={{
          borderColor: "rgb(137, 142, 159, 0.80)",
          borderBottomWidth: 0.2,
        }}
      >
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <Sceleton width={width - 40} height={40} borderRadius={8} />
        </View>
        <View style={{ flex: 1 }}>
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
            {[...Array(2)].map((_, i) => (
              <ProductCardSceleton key={i} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeSceleton;
