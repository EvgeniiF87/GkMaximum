import { View, Text, Dimensions } from "react-native";
import BonusCard from "../../bonus-card/BonusCard";

const { width } = Dimensions.get("window");
const height = (width / 100) * 49;

const BlockUserBonusCard = () => {
  return (
    <View style={{ marginTop: 10 }}>
      <View style={{ width, height }}>
        <BonusCard />
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text
          style={{
            fontSize: 12,
            color: "#272728",
            fontWeight: "600",
            marginBottom: 6,
          }}
        >
          Можно потратить до 50% стоимости товара бонусами.
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: "#272728",
            fontWeight: "400",
            lineHeight: 20,
          }}
        >
          За каждую покупку покупателю возвращается 10% бонусами через 7 дней
          после покупки.
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: "#272728",
            fontWeight: "600",
            marginTop: 6,
          }}
        >
          Бонусы сгорят 1 января
        </Text>
      </View>
    </View>
  );
};

export default BlockUserBonusCard;
