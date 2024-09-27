import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { Text } from "react-native";

type BadgeTypeKey = "isHit" | "isNew" | "isDiscount";

type ProductBadgeProps = {
  type: BadgeTypeKey;
  borderRadius?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  fontSize?: number;
};

const ProductBadge: FC<ProductBadgeProps> = ({
  type,
  borderRadius,
  paddingHorizontal,
  paddingVertical,
  fontSize,
}) => {
  const badgeType: Record<BadgeTypeKey, string> = {
    isHit: "хит",
    isNew: "новинка",
    isDiscount: "скидка",
  };

  return (
    <LinearGradient
      colors={["#DE002B", "#D71E56"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        borderRadius: borderRadius ? borderRadius : 2,
        paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0,
        paddingVertical: paddingVertical ? paddingVertical : 8,
      }}
    >
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          fontSize: fontSize ? fontSize : 16,
          fontWeight: "600",
          lineHeight: 20.8,
        }}
      >
        {badgeType[type].toUpperCase()}
      </Text>
    </LinearGradient>
  );
};

export default ProductBadge;
