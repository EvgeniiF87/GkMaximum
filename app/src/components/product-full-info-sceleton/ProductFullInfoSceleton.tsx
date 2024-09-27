import { View } from "react-native";
import ProductSliderSceleton from "./product-slider-sceleton/ProductSliderSceleton";
import ProductTitleSceleton from "./product-title-sceleton/ProductTitleSceleton";
import ProductDescriptionSceleton from "./product-description-sceleton/ProductDescriptionSceleton";
import ProductOptionsSceleton from "./product-options-sceleton/ProductOptionsSceleton";
import ProductPriceSceleton from "./product-price-sceleton/ProductPriceSceleton";
import ProductSpoilerSceleton from "./product-spoiler-sceleton/ProductSpoilerSceleton";
import Sceleton from "../sceleton/Sceleton";
import ProductCardSceleton from "../product-card/card-sceleton/ProductCardSceleton";

const ProductFullInfoSceleton = () => {
  return (
    <>
      <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
        <View>
          <ProductSliderSceleton />
        </View>

        <View style={{ marginTop: 20 }}>
          <ProductTitleSceleton />
        </View>

        <View style={{ marginTop: 10 }}>
          <ProductDescriptionSceleton />
        </View>

        <View style={{ marginTop: 10 }}>
          <ProductPriceSceleton />
        </View>

        <View style={{ marginTop: 60 }}>
          <ProductOptionsSceleton />
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <View
          style={{
            borderTopWidth: 0.2,
            borderBottomWidth: 0.2,
            borderColor: "#898E9F",
            paddingVertical: 20,
          }}
        >
          <ProductSpoilerSceleton />
        </View>

        <View
          style={{
            borderBottomWidth: 0.2,
            borderColor: "#898E9F",
            paddingVertical: 20,
          }}
        >
          <ProductSpoilerSceleton />
        </View>

        <View
          style={{
            borderBottomWidth: 0.2,
            borderColor: "#898E9F",
            paddingVertical: 20,
          }}
        >
          <ProductSpoilerSceleton />
        </View>

        <View
          style={{
            borderBottomWidth: 0.2,
            borderColor: "#898E9F",
            paddingVertical: 20,
          }}
        >
          <ProductSpoilerSceleton />
        </View>

        <View
          style={{
            borderBottomWidth: 0.2,
            borderColor: "#898E9F",
            paddingVertical: 20,
          }}
        >
          <ProductSpoilerSceleton />
        </View>

        <View
          style={{
            paddingVertical: 20,
          }}
        >
          <ProductSpoilerSceleton />
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Sceleton width={180} height={24} />
          <Sceleton width={24} height={24} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <ProductCardSceleton />
          <ProductCardSceleton />
        </View>
      </View>
    </>
  );
};

export default ProductFullInfoSceleton;
