import { FC } from "react";
import { Text, View } from "react-native";
import { IProductFullInfoData } from "../../../../entities/Product/types/product-type";
import NewOldPrice from "../../product-card/new-old-price/NewOldPrice";

type ProductTitleDescriptionPriceProps = {
  product: IProductFullInfoData | undefined;
};

const ProductTitleDescriptionPrice: FC<ProductTitleDescriptionPriceProps> = ({
  product,
}) => {
  return (
    <>
      <Text
        style={{
          color: "#272728",
          fontSize: 20,
          fontWeight: "600",
          lineHeight: 31.2,
        }}
      >
        {product?.title}
      </Text>

      <Text
        style={{
          color: "#272728",
          fontSize: 16,
          fontWeight: "400",
          lineHeight: 20.8,
        }}
      >
        {product?.description ? product?.description : ""}
      </Text>

      {product?.price_discount ? (
        <NewOldPrice
          oldPrice={product?.price}
          newPrice={product?.price_discount}
          oldPriceFontSize={18}
          newPriceFontSize={20}
          fontWeight={"600"}
        />
      ) : (
        <View style={{ height: 22 }}>
          <Text
            style={{
              color: "#272728",
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            {product?.price} ₽
          </Text>
        </View>
      )}
    </>
  );
};

export default ProductTitleDescriptionPrice;
