import { FC } from "react";
import { View, Text } from "react-native";
import StarRating from "react-native-star-rating-widget";

type LeaveFeedbackRatingProps = {
  rating: number;
  setRatingHandle: (value: number) => void;
};

const LeaveFeedbackRating: FC<LeaveFeedbackRatingProps> = ({
  rating,
  setRatingHandle,
}) => {
  return (
    <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            lineHeight: 20.8,
            color: "#272728",
          }}
        >
          Оцените продукт
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 22.4,
            color: "#272728",
          }}
        >
          Поставьте от 1 до 5 звёзд
        </Text>

        <View style={{ marginTop: 20 }}>
          <StarRating
            rating={rating}
            onChange={setRatingHandle}
            starSize={36}
            color={"#272728"}
            starStyle={{ marginLeft: 0 }}
          />
        </View>
      </View>
    </View>
  );
};

export default LeaveFeedbackRating;
