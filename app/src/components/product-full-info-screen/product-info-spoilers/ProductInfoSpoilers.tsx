import { FC } from "react";
import { Text } from "react-native";
import { IProductFullInfoData } from "../../../../entities/Product/types/product-type";
import Spoiler from "../../spoiler/Spoiler";

type ProductInfoSpoilersProps = {
  product: IProductFullInfoData | undefined;
};

const ProductInfoSpoilers: FC<ProductInfoSpoilersProps> = ({ product }) => {
  return (
    <>
      <Spoiler title="Описание" borderTop borderBottom>
        {product?.article && (
          <Text
            style={{
              color: "#272728",
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 22.4,
            }}
          >
            артикул: {product.article}
          </Text>
        )}

        {product?.description_general && (
          <Text
            style={{
              color: "#272728",
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 22.4,
              marginTop: 10,
            }}
          >
            {product.description_general}
          </Text>
        )}
        {product?.description_general === null && product.article === null && (
          <Text
            style={{
              color: "#272728",
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 22.4,
              marginTop: 10,
            }}
          >
            Нет описания для данного товара
          </Text>
        )}
      </Spoiler>

      <Spoiler title="Подробные характеристики" borderBottom>
        <Text
          style={{
            color: "#272728",
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 22.4,
            textAlign: "center",
          }}
        >
          Нет информации о характеристиках
        </Text>
      </Spoiler>

      {product?.description_use && (
        <Spoiler title="Применение" borderBottom>
          <Text
            style={{
              color: "#272728",
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 22.4,
            }}
          >
            {product?.description_use}
          </Text>
        </Spoiler>
      )}

      {product?.description_compos && (
        <Spoiler title="Состав" borderBottom>
          <Text
            style={{
              color: "#272728",
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 22.4,
            }}
          >
            {product?.description_compos}
          </Text>
        </Spoiler>
      )}

      {product?.description_brand && (
        <Spoiler title="О Бренде" borderBottom>
          <Text
            style={{
              color: "#272728",
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 22.4,
            }}
          >
            {product?.description_brand}
          </Text>
        </Spoiler>
      )}

      {product?.description_additional && (
        <Spoiler title="Дополнительная информация">
          <Text
            style={{
              color: "#272728",
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 22.4,
            }}
          >
            {product?.description_additional}
          </Text>
        </Spoiler>
      )}
    </>
  );
};

export default ProductInfoSpoilers;
