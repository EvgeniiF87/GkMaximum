import { FC } from "react";
import { View, Text } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import StarLineProcent from "./star-line-procent/StarLineProcent";
import { IReviewsStatistics } from "../../../../entities/Reviews/types/reviews-types";

type ReviewsStarsInfoProps = {
  reviewsStatistics: IReviewsStatistics;
  reviewsCount: number;
};

const ReviewsStarsInfo: FC<ReviewsStarsInfoProps> = ({
  reviewsStatistics,
  reviewsCount,
}) => {
  return (
    <View style={{ marginTop: 10 }}>
      <View
        style={{ paddingHorizontal: 20, flexDirection: "row", columnGap: 54 }}
      >
        <View style={{ width: "20%", justifyContent: "center", rowGap: 10 }}>
          <Text
            style={{
              color: "#272728",
              fontSize: 24,
              fontWeight: "600",
              lineHeight: 31.2,
            }}
          >
            {reviewsStatistics?.averageRate}
          </Text>

          <StarRatingDisplay
            rating={reviewsStatistics.averageRate}
            starSize={14}
            color={"#272728"}
            starStyle={{ columnGap: 2, marginHorizontal: 0 }}
          />

          <Text
            style={{
              color: "#272728",
              fontSize: 12,
              fontWeight: "400",
              lineHeight: 15.6,
            }}
          >
            {reviewsStatistics?.totalCount} оценок
          </Text>
        </View>

        <View style={{ width: "50%", rowGap: 10 }}>
          <StarLineProcent
            procent={reviewsStatistics?.percentRate?.five}
            numberStar="5"
          />
          <StarLineProcent
            procent={reviewsStatistics?.percentRate?.four}
            numberStar="4"
          />
          <StarLineProcent
            procent={reviewsStatistics?.percentRate?.three}
            numberStar="3"
          />
          <StarLineProcent
            procent={reviewsStatistics?.percentRate?.two}
            numberStar="2"
          />
          <StarLineProcent
            procent={reviewsStatistics?.percentRate?.one}
            numberStar="1"
          />
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          alignItems: "center",
          marginTop: 20,
          flexDirection: "row",
          columnGap: 10,
        }}
      >
        <Text
          style={{
            color: "#272728",
            fontSize: 16,
            fontWeight: "600",
            lineHeight: 20.8,
          }}
        >
          Отзывы
        </Text>
        <Text
          style={{
            color: "#898E9F",
            fontSize: 14,
            fontWeight: "600",
            lineHeight: 18.2,
          }}
        >
          {reviewsStatistics.totalCount}
        </Text>
      </View>
    </View>
  );
};

export default ReviewsStarsInfo;
