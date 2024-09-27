import { FC, useState, useEffect } from "react";
import {
  IProductFullInfoData,
  VariableUnitsData,
} from "../../../../entities/Product/types/product-type";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";
import { useAppSelector } from "../../../hooks/redux";

type ProductOptionsAndReviewsProps = {
  product: IProductFullInfoData | undefined;
  screen: "home" | "catalog";
  isSearch: boolean;
  searchQuery?: string;
};

const ProductOptionsAndReviews: FC<ProductOptionsAndReviewsProps> = ({
  product,
  screen,
  isSearch,
  searchQuery,
}) => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);
  const [sortedUnits, setSortedUnits] = useState<VariableUnitsData[]>([]);
  const { reviews } = useAppSelector((state) => state.ReviewsReducer);

  const handleButtonPress = (index: number, id: number) => {
    setActiveButtonIndex(index);
    if (screen === "home") {
      navigate("Main", {
        screen: "Tabs",
        params: {
          screen: "TabHome",
          params: { screen: "ProductFullInfo", params: { id } },
        },
      });
    }

    if (screen === "catalog") {
      navigate("Main", {
        screen: "Tabs",
        params: {
          screen: "TabCatalogAndSearch",
          params: { screen: "CatalogProductFullInfo", params: { id } },
        },
      });
    }

    if (screen === "catalog" && isSearch) {
      navigate("Main", {
        screen: "Tabs",
        params: {
          screen: "TabCatalogAndSearch",
          params: {
            screen: "CatalogProductFullInfo",
            params: { id, whatComeScreen: "search", searchQuery },
          },
        },
      });
    }
  };

  const productReviewsHandle = () => {
    if (screen === "home") {
      navigate("Main", {
        screen: "Tabs",
        params: {
          screen: "TabHome",
          params: { screen: "ProductReviews", params: { id: product?.id } },
        },
      });
    }

    if (screen === "catalog") {
      navigate("Main", {
        screen: "Tabs",
        params: {
          screen: "TabCatalogAndSearch",
          params: {
            screen: "CatalogProductReviews",
            params: { id: product?.id },
          },
        },
      });
    }
  };

  useEffect(() => {
    if (product) {
      const sorted = [...product.variable_units].sort(
        (a, b) => a.item_id - b.item_id
      );
      setSortedUnits(sorted);
    }
  }, [product]);

  return (
    <View
      style={{
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ alignItems: "flex-start", rowGap: 30, width: "50%" }}>
        <Text
          style={{
            color: "#272728",
            fontSize: 14,
            fontWeight: "600",
            lineHeight: 18.2,
          }}
        >
          {product?.description_units}
        </Text>

        <View style={{ flexDirection: "row", columnGap: 10 }}>
          {sortedUnits.map(({ item_id, value }, index) => (
            <View key={index}>
              {value !== null && (
                <TouchableOpacity
                  style={[
                    {
                      borderRadius: 6,
                      borderColor:
                        activeButtonIndex === index ? "#272728" : "#898E9F",
                      borderWidth: 1,
                      backgroundColor: "transparent",
                      padding: 10,
                    },
                  ]}
                  onPress={() => handleButtonPress(index, item_id)}
                >
                  <Text
                    style={{
                      color:
                        activeButtonIndex === index ? "#272728" : "#898E9F",
                      fontSize: 14,
                      fontWeight: "400",
                    }}
                  >
                    {value}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          rowGap: 10,
          width: "50%",
        }}
      >
        <TouchableOpacity
          disabled={!reviews.length ? true : false}
          onPress={productReviewsHandle}
          style={{ flexDirection: "row", justifyContent: "flex-end" }}
        >
          <Text
            style={{
              color: "#898E9F",
              fontSize: 14,
              fontWeight: "600",
              lineHeight: 18.2,
              textDecorationLine: reviews.length ? "underline" : "none",
            }}
          >
            {reviews.length ? "Отзывы" : "Нет отзывов"}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            columnGap: 5,
          }}
        >
          <Text
            style={{
              color: "#272728",
              fontSize: 18,
              fontWeight: "600",
              lineHeight: 18.2,
            }}
          >
            {product?.rate}
          </Text>
          <StarRatingDisplay
            rating={Number(product?.rate)}
            starSize={12}
            color={"#272728"}
            starStyle={{ columnGap: 2, marginHorizontal: 0 }}
          />
        </View>
      </View>
    </View>
  );
};

export default ProductOptionsAndReviews;
