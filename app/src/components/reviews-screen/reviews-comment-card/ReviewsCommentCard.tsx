import { FC } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { IReviewsComment } from "../../../../entities/Reviews/types/reviews-types";
import { devApiImgUrl } from "../../../../api/config/config";
import { convertDateToDayAndMonthAndYear } from "../../../helpers/convert-date";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";

type ReviewsCommentCardProps = {
  review: IReviewsComment;
};

const ReviewsCommentCard: FC<ReviewsCommentCardProps> = ({ review }) => {
  const { navigate } = useNavigation<AppPropsScreen>();

  const fullImagesScreenHandle = (index: number) => {
    navigate("ProductReviewsAllPhotos", { images: review.img, index });
  };

  return (
    <View style={{ paddingHorizontal: 20, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View>
          <Text
            style={{
              color: "#272728",
              fontSize: 16,
              fontWeight: "600",
              lineHeight: 20.8,
              marginBottom: 2,
            }}
          >
            {review.name}
          </Text>
          <Text
            style={{
              color: "#272728",
              fontSize: 8,
              fontWeight: "400",
              lineHeight: 10.4,
            }}
          >
            {convertDateToDayAndMonthAndYear(review.date_Create)}
          </Text>
        </View>
        <StarRatingDisplay
          rating={review.rate}
          starSize={14}
          color={"#272728"}
          starStyle={{ columnGap: 2, marginHorizontal: 0 }}
        />
      </View>

      {review.comment.length > 0 && (
        <View style={{ marginTop: 15 }}>
          <Text
            style={{
              color: "#272728",
              fontSize: 12,
              fontWeight: "600",
              lineHeight: 15.6,
              marginBottom: 4,
            }}
          >
            Комментарий
          </Text>
          <Text
            style={{
              color: "#272728",
              fontSize: 10,
              fontWeight: "400",
              lineHeight: 13,
            }}
          >
            {review.comment}
          </Text>
        </View>
      )}

      {Array.isArray(review.img) && (
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1, paddingVertical: 10, paddingRight: 20 }}
          >
            <View
              style={{
                marginBottom: 10,
                paddingRight: 20,
                flexDirection: "row",
                columnGap: 10,
              }}
            >
              {review &&
                review?.img &&
                review?.img.map((photo, i) => (
                  <TouchableOpacity
                    key={photo}
                    onPress={() => fullImagesScreenHandle(i)}
                  >
                    <Image
                      source={{ uri: photo ? `${devApiImgUrl}/${photo}` : "" }}
                      style={{
                        flex: 1,
                        width: 60,
                        height: 60,
                        resizeMode: "cover",
                        borderRadius: 4,
                      }}
                    />
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ReviewsCommentCard;
