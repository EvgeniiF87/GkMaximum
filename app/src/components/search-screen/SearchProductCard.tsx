import { FC } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { ISearchItem } from "../../../entities/Search/types/search-types";
import { devApiImgUrl } from "../../../api/config/config";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";

type SearchProductCardProps = {
  product: ISearchItem;
  searchQuery?: string;
};

const { width } = Dimensions.get("window");

const SearchProductCard: FC<SearchProductCardProps> = ({
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
  };

  return (
    <TouchableOpacity onPress={productFullInfoHandle}>
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
        <Text
          style={{
            color: "#272728",
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 22.4,
            marginLeft: 10,
            width: width - 40 - 60,
          }}
        >
          {product.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchProductCard;
