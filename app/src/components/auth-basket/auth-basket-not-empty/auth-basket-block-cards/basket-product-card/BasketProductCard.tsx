import { FC } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import CheckBoxButton from "./CheckBoxButton";
import BlockAddRemoveButtons from "./BlockAddRemoveButtons";
import { IBasketProduct } from "../../../../../../entities/Basket/types/basket-types";
import { devApiImgUrl } from "../../../../../../api/config/config";
import { Icon } from "../../../../Icon/Icon";
import { AppIcons } from "../../../../../Icons";

type BasketProductCardProps = {
  product: IBasketProduct;
  showModalHandle: (isFavorites?: boolean, prodyctID?: number) => void;
};

const BasketProductCard: FC<BasketProductCardProps> = ({
  product,
  showModalHandle,
}) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        borderBottomWidth: 0.7,
        paddingBottom: 10,
        borderColor: "#D1D3DE",
        marginTop: 10,
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        onPress={() => showModalHandle(product.isFavourite, product.id)}
        style={{ position: "absolute", top: 5, right: 10, zIndex: 100 }}
      >
        <Icon viewBox="4 20" size={20} path={AppIcons.app.ellipsis()} />
      </TouchableOpacity>

      {product?.in_stock === 1 && (
        <View style={{ justifyContent: "center" }}>
          <CheckBoxButton selected={product.selected} id={product.id} />
        </View>
      )}

      <View style={{ marginLeft: product.in_stock === 1 ? 10 : 0 }}>
        <View style={{ flexDirection: "row" }}>
          <View>
            {product?.in_stock === 0 && (
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  top: 30,
                  right: 0,
                  left: 0,
                  zIndex: 199,
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: 4,
                    paddingVertical: 3,
                  }}
                >
                  <Text
                    style={{
                      color: "#898E9F",
                      textAlign: "center",
                      fontSize: 14,
                      fontWeight: "600",
                      lineHeight: 20.8,
                    }}
                  >
                    закончился
                  </Text>
                </View>
              </View>
            )}
            <Image
              source={{ uri: `${devApiImgUrl}/${product.img}` }}
              style={{
                width: 93,
                height: 83,
                resizeMode: "cover",
                borderRadius: 6,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                lineHeight: 15.6,
                color: product?.in_stock === 1 ? "#898E9F" : "#D1D3DE",
                marginTop: 6,
              }}
            >
              {product?.variable_units} {product?.description_units}
            </Text>
          </View>

          <View
            style={{ marginLeft: 10, rowGap: 15, alignItems: "flex-start" }}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={{
                fontSize: 14,
                maxWidth: product?.in_stock === 1 ? "75%" : "80%",
                fontWeight: "600",
                lineHeight: 18.2,
                color: product?.in_stock === 1 ? "#272728" : "#D1D3DE",
              }}
            >
              {product?.title}
            </Text>

            <BlockAddRemoveButtons
              count={product?.count}
              id={product.id}
              inStock={product?.in_stock}
            />

            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Text
                style={{
                  fontSize: product?.price_discount ? 14 : 16,
                  fontWeight: product?.price_discount ? "400" : "600",
                  lineHeight: product?.price_discount ? 22.4 : 20.8,
                  color:
                    product?.in_stock === 1
                      ? "#272728"
                      : product?.price_discount && product?.in_stock === 1
                      ? "#898E9F"
                      : "#D1D3DE",
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
                    color: product?.in_stock === 1 ? "#DE002B" : "#D1D3DE",
                    marginLeft: 8,
                  }}
                >
                  {product?.price_discount} ₽
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BasketProductCard;
