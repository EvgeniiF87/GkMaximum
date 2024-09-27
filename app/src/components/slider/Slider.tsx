import { FC, useState } from "react";
import * as Linking from "expo-linking";
import { Dimensions, View, Image, TouchableOpacity } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { devApiImgUrl } from "../../../api/config/config";
import { IBanner } from "../../../entities/Banners/types/banners-types";

type SliderProps = {
  images: IBanner[] | string[];
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  autoplayInterval?: number;
  imageHeight?: number;
  imageBorderRadius?: number;
  typeSource: "local" | "network";
  type?: "advertising" | "default";
  marginTop?: number;
  marginBottom?: number;
};

const Slider: FC<SliderProps> = ({
  images,
  loop,
  autoplay,
  autoplayDelay,
  autoplayInterval,
  typeSource,
  type = "default",
  imageHeight,
  imageBorderRadius,
  marginTop,
  marginBottom,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const precentWidthOnHeight = imageHeight ? imageHeight : 60;

  const { width } = Dimensions.get("window");
  const height = (width / 100) * precentWidthOnHeight;

  const onPressHandle = async (url: string) => {
    Linking.openURL(`${url}`);
  };

  const rItem = (image: { item: any; index: number }) => {
    if (typeSource === "local") {
      return (
        <Image
          key={image.index}
          source={image.item}
          style={{
            width: width - 40,
            height,
            borderRadius: imageBorderRadius ? imageBorderRadius : 16,
          }}
        />
      );
    } else {
      return (
        <Image
          key={image.index}
          source={{ uri: `${devApiImgUrl}/${image.item}` }}
          style={{
            width: width - 40,
            height,
            borderRadius: imageBorderRadius ? imageBorderRadius : 16,
            resizeMode: "contain",
          }}
        />
      );
    }
  };

  const rItemAdvertising = (image: { item: IBanner | any; index: number }) => {
    if (typeSource === "local") {
      return (
        <Image
          key={image.index}
          source={image.item}
          style={{
            width: width - 40,
            height,
            borderRadius: imageBorderRadius ? imageBorderRadius : 16,
          }}
        />
      );
    } else {
      return (
        <TouchableOpacity onPress={() => onPressHandle(image.item.url)}>
          <Image
            key={image.index}
            source={{ uri: `${devApiImgUrl}/${image.item.img}` }}
            style={{
              width: width - 40,
              height,
              borderRadius: imageBorderRadius ? imageBorderRadius : 16,
              resizeMode: "cover",
            }}
          />
        </TouchableOpacity>
      );
    }
  };

  const renderItem = type === "default" ? rItem : rItemAdvertising;

  return (
    <View
      style={{
        marginTop: marginTop ? marginTop : 20,
        marginBottom: marginBottom ? marginBottom : 15,
      }}
    >
      <Carousel
        layout={"default"}
        data={images}
        renderItem={renderItem}
        sliderWidth={width}
        sliderHeight={height}
        itemWidth={width - 40}
        itemHeight={height}
        firstItem={activeSlide}
        onSnapToItem={(index) => setActiveSlide(index)}
        loop={loop}
        autoplay={autoplay}
        autoplayDelay={autoplayDelay}
        autoplayInterval={autoplayInterval}
      />

      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          position: "absolute",
          right: 20,
          bottom: -15,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 0,
        }}
        dotColor={"#DE002B"}
        // dotColor={"rgba(246, 73, 73, 0.92)"}
        dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 8,
          margin: 0,
          padding: 0,
        }}
        inactiveDotColor={"black"}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default Slider;
