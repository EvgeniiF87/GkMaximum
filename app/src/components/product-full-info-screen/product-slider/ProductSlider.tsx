import { FC } from "react";
import { View, Text, Dimensions } from "react-native";
import Slider from "../../slider/Slider";
import ProductBadge from "../../product-badge/ProductBadge";
import { IProductFullInfoData } from "../../../../entities/Product/types/product-type";

type ProductSliderProps = {
  product: IProductFullInfoData | undefined;
};

const { width } = Dimensions.get("window");

const ProductSlider: FC<ProductSliderProps> = ({ product }) => {
  return (
    <View style={{ position: "relative" }}>
      <Slider
        images={product?.img || []}
        typeSource={"network"}
        imageHeight={80}
        imageBorderRadius={0}
        marginTop={0}
        marginBottom={0}
      />

      {product?.in_stock === 0 && (
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: 143,
            right: 20,
            left: 20,
            zIndex: 99,
          }}
        >
          <View
            style={{
              width: width - 80,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: 4,
              paddingVertical: 20,
            }}
          >
            <Text
              style={{
                color: "#898E9F",
                textAlign: "center",
                fontSize: 18,
                fontWeight: "600",
                lineHeight: 20.8,
              }}
            >
              нет в наличии
            </Text>
          </View>
        </View>
      )}

      <View
        style={{
          position: "absolute",
          top: 60,
          right: 10,
          zIndex: 100,
          rowGap: 10,
        }}
      >
        {product?.isHit && (
          <ProductBadge
            type={"isHit"}
            fontSize={10}
            paddingVertical={2}
            paddingHorizontal={8}
          />
        )}
        {product?.isNew && (
          <ProductBadge
            type={"isNew"}
            fontSize={10}
            paddingVertical={2}
            paddingHorizontal={8}
          />
        )}
        {product?.isDiscount && (
          <ProductBadge
            type={"isDiscount"}
            fontSize={10}
            paddingVertical={2}
            paddingHorizontal={8}
          />
        )}
      </View>
    </View>
  );
};

export default ProductSlider;
