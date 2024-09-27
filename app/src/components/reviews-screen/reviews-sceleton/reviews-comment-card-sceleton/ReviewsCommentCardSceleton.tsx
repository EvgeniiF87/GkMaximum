import { Dimensions, View } from "react-native";
import Sceleton from "../../../sceleton/Sceleton";

const ReviewsCommentCardSceleton = () => {
  const { width } = Dimensions.get("window");

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View>
          <Sceleton width={100} height={27} borderRadius={4} />
          <Sceleton
            width={85}
            height={12}
            borderRadius={2}
            styles={{ marginTop: 8 }}
          />
        </View>
        <View>
          <Sceleton width={120} height={20} borderRadius={4} />
        </View>
      </View>

      <Sceleton
        width={140}
        height={22}
        borderRadius={4}
        styles={{ marginTop: 20 }}
      />

      <Sceleton
        width={width - 80}
        height={18}
        borderRadius={4}
        styles={{ marginTop: 8 }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          columnGap: 10,
          marginTop: 10,
        }}
      >
        <Sceleton width={60} height={60} borderRadius={4} />
        <Sceleton width={60} height={60} borderRadius={4} />
      </View>
    </View>
  );
};

export default ReviewsCommentCardSceleton;
