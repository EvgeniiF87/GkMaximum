import { FC } from "react";
import { View, Text } from "react-native";
import ButtonOutline from "../../../ui/ButtonOutline.tsx/ButtonOutline";

type statusType = "В сборке" | "Доставлен" | "В пути" | "Отменён";

type OrderStatusInfoProps = {
  status: statusType;
  onPressCancelOrder: () => void;
};

const OrderStatusInfo: FC<OrderStatusInfoProps> = ({
  status,
  onPressCancelOrder,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {status === "В сборке" ? (
        <View>
          <ButtonOutline
            title="ОТМЕНИТЬ"
            type={"dark"}
            onPressHandle={onPressCancelOrder}
            fontSize={10}
            paddingHorizontal={6}
            paddingVertical={6}
            // _styles={{ padding: 6, flex: 1 }}
          />
        </View>
      ) : (
        <View style={{ width: 60 }}></View>
      )}

      <View
        style={{
          paddingVertical: 6,
          paddingHorizontal: 10,
          borderRadius: 46,
          backgroundColor:
            status === "В сборке"
              ? "#FFA1CE"
              : status === "Доставлен"
              ? "#CAF2D1"
              : status === "В пути"
              ? "#A6BFFF"
              : "#D1D3DE",
        }}
      >
        <Text
          style={{
            color: "#272728",
            fontSize: 14,
            fontWeight: "600",
            lineHeight: 18.2,
          }}
        >
          {status}
        </Text>
      </View>
    </View>
  );
};

export default OrderStatusInfo;
