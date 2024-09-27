import { FC } from "react";
import { ScrollView, View, Image, TouchableOpacity } from "react-native";
import { devApiImgUrl } from "../../../../api/config/config";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";

type ReviewsPhotoSliderProps = {
  images: string[];
};

const ReviewsPhotoSlider: FC<ReviewsPhotoSliderProps> = ({ images }) => {
  const { navigate } = useNavigation<AppPropsScreen>();

  const fullImagesScreenHandle = (index: number) => {
    navigate("ProductReviewsAllPhotos", { images, index });
  };

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 20, flex: 1 }}>
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
          {images.map((photo, i) => (
            <TouchableOpacity key={i} onPress={() => fullImagesScreenHandle(i)}>
              <Image
                source={{ uri: `${devApiImgUrl}/${photo}` }}
                style={{
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
  );
};

export default ReviewsPhotoSlider;
