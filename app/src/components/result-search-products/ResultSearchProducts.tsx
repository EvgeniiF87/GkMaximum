import { FC } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useAppSelector } from "../../hooks/redux";
import ProductCardSceleton from "../product-card/card-sceleton/ProductCardSceleton";
import ProductCard from "../product-card/ProductCard";
import { useMoreSearchProducts } from "../../hooks/MoreSearchProducts";

type ResultSearchProductsProps = {
  searchQuery: string;
  whatComeScreen: "home" | "catalog";
};

const ResultSearchProducts: FC<ResultSearchProductsProps> = ({
  searchQuery,
  whatComeScreen,
}) => {
  const { isLoading } = useAppSelector((state) => state.AppReducer);
  const { searchResult, allSearchCount } = useAppSelector(
    (state) => state.SearchReducer
  );

  const screen = whatComeScreen === "home" ? "home" : "catalog";

  const { moreSearchProductsHandle, loading, fetching } =
    useMoreSearchProducts();

  return (
    <View style={{ paddingVertical: 20 }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          rowGap: 20,
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}
      >
        {isLoading
          ? [...Array(6)].map((_, i) => <ProductCardSceleton key={i} />)
          : searchResult.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatComeScreen={screen}
              />
            ))}
        {(loading || fetching) &&
          [...Array(2)].map((_, i) => <ProductCardSceleton key={i} />)}
      </View>

      {allSearchCount !== searchResult.length && (
        <View
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => moreSearchProductsHandle(searchQuery)}
            style={{
              borderColor: "#272728",
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "300",
                color: "#272728",
              }}
            >
              Загрузить ещё
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ResultSearchProducts;
