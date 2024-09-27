import { FC } from "react";
import { View, ScrollView, StyleProp, ViewStyle } from "react-native";
import { styles } from "./styles";
import ProductCard from "../product-card/ProductCard";
import BlockArrowRight from "../block-arrow-right/BlockArrowRight";
import ProductCardSceleton from "../product-card/card-sceleton/ProductCardSceleton";
import { IProduct } from "../../../entities/Product/types/product-type";
import { useAppSelector } from "../../hooks/redux";

type variant = "vertical" | "horizontal";

type SectionHorizontalPropsType = {
  title: string;
  titleColor?: string;
  titleFontSize?: number;
  titlePaddingHorizontal?: number;
  sceletoncCountElements?: number;
  link?: () => void;
  variant?: variant;
  topLine?: boolean;
  bottomLine?: boolean;
  notTouchable?: boolean;
  products: IProduct[];
  whatComeScreen?: "home" | "catalog";
  _styles?: StyleProp<ViewStyle>;
};

const Section: FC<SectionHorizontalPropsType> = ({
  title,
  titleColor,
  titleFontSize,
  titlePaddingHorizontal,
  sceletoncCountElements,
  link,
  _styles,
  topLine,
  variant,
  bottomLine,
  notTouchable,
  products,
  whatComeScreen,
}) => {
  const count = sceletoncCountElements ? sceletoncCountElements : 4;
  const { isLoading } = useAppSelector((state) => state.AppReducer);

  return (
    <View
      style={[
        styles.wrap,
        {
          borderColor: "rgb(137, 142, 159, 0.80)",
          borderTopWidth: topLine ? 0.2 : 0,
          borderBottomWidth: bottomLine ? 0.2 : 0,
        },
        _styles,
      ]}
    >
      <BlockArrowRight
        notTouchable={notTouchable}
        paddingHorizontal={titlePaddingHorizontal}
        title={title}
        titleColor={titleColor}
        titleFontSize={titleFontSize}
        navigationHandle={link}
      />
      <View style={{ flex: 1 }}>
        <ScrollView
          horizontal={!variant || variant === "horizontal" ? true : false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent:
                variant === "vertical" ? "space-around" : "center",
              rowGap: 20,
              paddingHorizontal: 10,
              paddingBottom: 20,
            }}
          >
            {/* {isLoading
              ? [...Array(count)].map((_, i) => <ProductCardSceleton key={i} />)
              : products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))} */}
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatComeScreen={whatComeScreen}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Section;
