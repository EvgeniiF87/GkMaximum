import { Dimensions, View } from "react-native";
import Sceleton from "../sceleton/Sceleton";

const { width } = Dimensions.get("window");

const SearchProductCardSceleton = () => {
  return (
    <View style={{ paddingHorizontal: 20, rowGap: 10 }}>
      {[...Array(6)].map((_, i) => (
        <View key={i} style={{ flexDirection: "row", height: 60 }}>
          <Sceleton width={60} height={60} borderRadius={10} />
          <View style={{ marginLeft: 20 }}>
            <Sceleton width={width - 70 - 60} height={30} borderRadius={6} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default SearchProductCardSceleton;
