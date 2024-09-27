import { FC } from "react";
import { IProductFullInfoData } from "../../../entities/Product/types/product-type";
import ProductSlider from "./product-slider/ProductSlider";
import ProductTitleDescriptionPrice from "./product-title-description-price/ProductTitleDescriptionPrice";
import { View } from "react-native";
import ProductOptionsAndReviews from "./product-options-and-reviews/ProductOptionsAndReviews";
import ProductInfoSpoilers from "./product-info-spoilers/ProductInfoSpoilers";

type ProductInfoProps = {
  product: IProductFullInfoData | undefined;
  screen: "home" | "catalog";
  isSearch?: boolean;
  searchQuery?: string;
};

const ProductInfo: FC<ProductInfoProps> = ({
  product,
  screen,
  isSearch,
  searchQuery,
}) => {
  return (
    <>
      <ProductSlider product={product} />

      <View style={{ marginTop: 10, paddingHorizontal: 20, rowGap: 10 }}>
        <ProductTitleDescriptionPrice product={product} />
        <ProductOptionsAndReviews
          product={product}
          screen={screen}
          isSearch={isSearch ?? false}
          searchQuery={searchQuery}
        />
      </View>

      <View
        style={{
          marginTop: 30,
          paddingBottom: product && product?.recomendation.length > 0 ? 0 : 60,
        }}
      >
        <ProductInfoSpoilers product={product} />
      </View>
    </>
  );
};

export default ProductInfo;
