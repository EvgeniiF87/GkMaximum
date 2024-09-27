import { FC } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { devApiImgUrl } from "../../../api/config/config";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import { IProduct } from "../../../entities/Product/types/product-type";

type SearchProductCardProps = {
  product: IProduct;
  searchQuery?: string;
};

const { width } = Dimensions.get("window");

const SearchRecomendationProductCard: FC<SearchProductCardProps> = ({
  product,
  searchQuery,
}) => {
  const { navigate } = useNavigation<AppPropsScreen>();

  const productFullInfoHandle = () => {
    navigate("Main", {
      screen: "Tabs",
      params: {
        screen: "TabCatalogAndSearch",
        params: {
          screen: "CatalogProductFullInfo",
          params: { id: product.id, whatComeScreen: "search", searchQuery },
        },
      },
    });

    // navigate("Main", {
    //   screen: "Tabs",
    //   params: {
    //     screen: "TabHome",
    //     params: { screen: "ProductFullInfo", params: { id: product.id } },
    //   },
    // });
  };

  return (
    <TouchableOpacity
      style={{ width: width - 40 }}
      onPress={productFullInfoHandle}
    >
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingVertical: 8,
          borderColor: "#D1D3DE",
          borderBottomWidth: 1,
        }}
      >
        <Image
          source={{
            uri: `${devApiImgUrl}/${product.img}`,
            // uri: `${devApiImgUrl}/${product.img.match(/\["(.+)"\]/)?.[1]}`,
          }}
          style={{ width: 60, height: 60, resizeMode: "cover" }}
        />
        <View style={{ marginLeft: 10, rowGap: 2 }}>
          <Text
            style={{
              color: "#272728",
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 22.4,
              width: width - 100,
            }}
          >
            {product.title}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Text
              style={{
                fontSize: product?.price_discount ? 10 : 16,
                fontWeight: product?.price_discount ? "400" : "600",
                lineHeight: product?.price_discount ? 13 : 20.8,
                color: product?.price_discount ? "#898E9F" : "#272728",
                textDecorationLine: product?.price_discount
                  ? "line-through"
                  : "none",
              }}
            >
              {product?.price} ₽
            </Text>

            {product?.price_discount && (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  lineHeight: 20.8,
                  color: "#DE002B",
                  marginLeft: 8,
                }}
              >
                {product?.price_discount} ₽
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchRecomendationProductCard;
