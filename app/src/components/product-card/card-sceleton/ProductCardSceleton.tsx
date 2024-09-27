import { View } from "react-native";
import { styles } from "../styles";
import Sceleton from "../../sceleton/Sceleton";

const ProductCardSceleton = () => {
  return (
    <View style={styles.wrapCard}>
      <View style={styles.imgWrap}>
        <View style={styles.imgContent}>
          <Sceleton width={160} height={176} borderRadius={15} />
        </View>
      </View>

      <View>
        <View
          style={{
            marginTop: 8,
            overflow: "hidden",
            flexDirection: "column",
            alignItems: "flex-start",
            rowGap: 8,
          }}
        >
          <Sceleton width={150} height={32} borderRadius={2} />
          <Sceleton width={120} height={17} borderRadius={2} />
        </View>
      </View>
    </View>
  );
};

export default ProductCardSceleton;
