import { FC } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useAppSelector } from "../../hooks/redux";
import { useMoreFilteredProducts } from "../../hooks/MoreFilteredProducts";
import ProductCardSceleton from "../product-card/card-sceleton/ProductCardSceleton";
import ProductCard from "../product-card/ProductCard";

type ResultFilteredCatalogProductsProps = {
  whatComeScreen: "home" | "catalog";
  searchQuery: string;
};

const ResultFilteredCatalogProducts: FC<ResultFilteredCatalogProductsProps> = ({
  whatComeScreen,
  searchQuery,
}) => {
  const { isLoading } = useAppSelector((state) => state.AppReducer);
  const { filteredProduct, allCount } = useAppSelector(
    (state) => state.FilteredProductReducer
  );

  const screen = whatComeScreen === "home" ? "home" : "catalog";

  const { moreFilteredProductsHandle, loading } = useMoreFilteredProducts();

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
          : filteredProduct.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatComeScreen={screen}
              />
            ))}
        {loading &&
          [...Array(2)].map((_, i) => <ProductCardSceleton key={i} />)}
      </View>

      {allCount !== filteredProduct.length && (
        <View
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => moreFilteredProductsHandle(searchQuery)}
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

export default ResultFilteredCatalogProducts;
