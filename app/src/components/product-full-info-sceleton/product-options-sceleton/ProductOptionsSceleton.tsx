import { View } from "react-native";
import Sceleton from "../../sceleton/Sceleton";

const ProductOptionsSceleton = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ rowGap: 30, width: "50%" }}>
        <Sceleton width={110} height={20} borderRadius={2} />
        <View style={{ flexDirection: "row", columnGap: 10 }}>
          <Sceleton width={60} height={50} borderRadius={2} />
          <Sceleton width={60} height={50} borderRadius={2} />
        </View>
      </View>

      <View style={{ rowGap: 10, width: "50%", alignItems: "flex-end" }}>
        <Sceleton width={60} height={20} borderRadius={2} />
        <Sceleton width={120} height={30} borderRadius={2} />
      </View>
    </View>
  );
};

export default ProductOptionsSceleton;
