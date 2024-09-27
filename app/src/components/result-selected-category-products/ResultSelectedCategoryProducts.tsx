import { TouchableOpacity, View, Text } from "react-native";
import { useAppSelector } from "../../hooks/redux";
import ProductCardSceleton from "../product-card/card-sceleton/ProductCardSceleton";
import ProductCard from "../product-card/ProductCard";
import { useMoreCatalogProducts } from "../../hooks/MoreCatalogProducts";

const ResultSelectedCategoryProducts = () => {
  const { isLoading } = useAppSelector((state) => state.AppReducer);
  const { catalogProduct, allCount } = useAppSelector(
    (state) => state.CatalogProductReducer
  );

  const { moreCatalogProductsHandle, isLoadingCategory, isFetchingCategory } =
    useMoreCatalogProducts();

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
          : catalogProduct.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatComeScreen={"catalog"}
              />
            ))}
        {(isLoadingCategory || isFetchingCategory) &&
          [...Array(2)].map((_, i) => <ProductCardSceleton key={i} />)}
      </View>

      {allCount !== catalogProduct.length && (
        <View
          style={{
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={moreCatalogProductsHandle}
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

export default ResultSelectedCategoryProducts;
