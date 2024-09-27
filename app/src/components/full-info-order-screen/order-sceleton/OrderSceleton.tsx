import { View } from "react-native";
import Sceleton from "../../sceleton/Sceleton";

const CardProduct = () => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        borderBottomWidth: 0.7,
        paddingBottom: 10,
        borderColor: "#D1D3DE",
        marginTop: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Sceleton width={93} height={83} borderRadius={4} />
        <View style={{ marginLeft: 10, rowGap: 10 }}>
          <Sceleton width={160} height={20} borderRadius={4} />
          <Sceleton width={140} height={18} borderRadius={4} />
          <Sceleton width={120} height={20} borderRadius={4} />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Sceleton width={60} height={10} borderRadius={2} />
      </View>
    </View>
  );
};

const OrderSceleton = () => {
  return (
    <View style={{ marginTop: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: 20,
        }}
      >
        <Sceleton width={100} height={30} borderRadius={46} />
      </View>

      <View style={{ marginTop: 20, rowGap: 20, paddingHorizontal: 20 }}>
        <Sceleton width={120} height={24} borderRadius={4} />
        <Sceleton width={100} height={20} borderRadius={4} />
        <Sceleton height={20} borderRadius={4} styles={{ width: "100%" }} />
        <Sceleton height={20} borderRadius={4} styles={{ width: "100%" }} />
        <Sceleton height={20} borderRadius={4} styles={{ width: "100%" }} />
      </View>

      <View style={{ marginTop: 40 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Sceleton
            width={180}
            height={24}
            borderRadius={4}
            styles={{ marginBottom: 10 }}
          />
        </View>

        {[...Array(2)].map((_, i) => (
          <CardProduct key={i} />
        ))}
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
        <Sceleton height={50} borderRadius={46} styles={{ width: "100%" }} />
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
        <Sceleton width={220} height={24} borderRadius={4} />

        <View style={{ rowGap: 10, marginTop: 20 }}>
          <Sceleton width={180} height={16} borderRadius={4} />
          <Sceleton width={160} height={16} borderRadius={4} />
        </View>

        <View style={{ rowGap: 10, marginTop: 20 }}>
          <Sceleton width={180} height={16} borderRadius={4} />
          <Sceleton width={160} height={16} borderRadius={4} />
        </View>

        <View style={{ rowGap: 10, marginTop: 20 }}>
          <Sceleton width={180} height={16} borderRadius={4} />
          <Sceleton width={160} height={16} borderRadius={4} />
        </View>
      </View>
    </View>
  );
};

export default OrderSceleton;
