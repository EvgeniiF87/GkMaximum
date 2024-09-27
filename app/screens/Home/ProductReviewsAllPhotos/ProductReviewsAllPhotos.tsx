import { FC } from "react";
import { Dimensions, View, FlatList, Image } from "react-native";
import Header from "../../../src/components/header/Header";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Layout from "../../../src/components/layout/Layout";
import { AppStackParamList } from "../../../navigation/routes/app-navigation";
import { devApiImgUrl } from "../../../api/config/config";

const { width } = Dimensions.get("window");

type ProductReviewsAllPhotosProps = {
  route: RouteProp<AppStackParamList, "ProductReviewsAllPhotos">;
};

const ProductReviewsAllPhotos: FC<ProductReviewsAllPhotosProps> = ({
  route,
}) => {
  const { goBack } = useNavigation();
  const { images, index: currentImage } = route.params;

  return (
    <Layout
      noMenu
      backgroundColor="#000"
      notScroll
      header={
        <Header
          title="Фото"
          titleColor="#fff"
          leftIconColor="#fff"
          backgroundColor="#000"
          leftIcon
          navigationHandle={goBack}
        />
      }
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          initialNumToRender={images.length}
          initialScrollIndex={currentImage}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: `${devApiImgUrl}/${item}` }}
                style={{
                  width,
                  height: (width * 100) / 80,
                  resizeMode: "cover",
                }}
              />
            </View>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </Layout>
  );
};

export default ProductReviewsAllPhotos;
