import { FC } from "react";
import { View, Text } from "react-native";
import { Icon } from "../../../../Icon/Icon";
import { AppIcons } from "../../../../../Icons";

type BlockOrderBonusProps = {
  bonus: number;
};

const BlockOrderBonus: FC<BlockOrderBonusProps> = ({ bonus }) => {
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: "400",
          lineHeight: 15.6,
          color: "#272728",
        }}
      >
        Начислится бонусов:
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 2,
          paddingHorizontal: 12,
          columnGap: 2,
          borderColor: "#3E3E40",
          borderWidth: 1,
          borderRadius: 30,
        }}
      >
        <Icon viewBox="30 30" size={16} path={AppIcons.app.bonus("#DE002B")} />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            lineHeight: 18.2,
            color: "#272728",
          }}
        >
          {Math.round(bonus)}
        </Text>
      </View>
    </View>
  );
};

export default BlockOrderBonus;
