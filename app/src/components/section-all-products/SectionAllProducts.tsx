import { FC } from "react";
import {
  View,
  ScrollView,
  StyleProp,
  ViewStyle,
  Text,
  TouchableOpacity,
} from "react-native";
import ProductCard from "../product-card/ProductCard";
import ProductCardSceleton from "../product-card/card-sceleton/ProductCardSceleton";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setAllProducts, setPage } from "../../../store/reducers/SectionSlice";
import { useLazyGetMainScreenAllProductsQuery } from "../../../api/MainScreen/MainScreenApi";
import useAppAlertNotification from "../../hooks/AppAlertNotification";
import { DevelopmentDebug } from "../../helpers/development-debug";

type SectionAllProductsPropsType = {
  sceletoncCountElements?: number;
  topLine?: boolean;
  bottomLine?: boolean;
  _styles?: StyleProp<ViewStyle>;
};

const SectionAllProducts: FC<SectionAllProductsPropsType> = ({
  sceletoncCountElements,
  _styles,
  topLine,
  bottomLine,
}) => {
  const count = sceletoncCountElements ? sceletoncCountElements : 4;
  const { alertNotification } = useAppAlertNotification();
  const { isLoading } = useAppSelector((state) => state.AppReducer);
  const { name } = useAppSelector((state) => state.RegionReducer);
  const { allProductsCount, allProducts, page } = useAppSelector(
    (state) => state.SectionReducer
  );
  const dispatch = useAppDispatch();
  const [getAllProducts, { isLoading: loading }] =
    useLazyGetMainScreenAllProductsQuery();

  const moreProductsHandle = async () => {
    getAllProducts({ region: name, page: page + 1 })
      .unwrap()
      .then((allProductsData) => {
        if (allProductsData.status === "success") {
          dispatch(setPage(allProductsData.data.page));
          dispatch(setAllProducts(allProductsData?.data.items));
        }
      })
      .catch((err: any) => {
        DevelopmentDebug({ "Получение товара на главной": err });
        alertNotification({
          message: "Ошибка получения товара!",
          type: "error",
        });
      });
  };

  return (
    <View
      style={[
        {
          flex: 1,
          borderColor: "rgb(137, 142, 159, 0.80)",
          borderTopWidth: topLine ? 0.2 : 0,
          borderBottomWidth: bottomLine ? 0.2 : 0,
        },
        _styles,
      ]}
    >
      <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: "#272728",
          }}
        >
          Все товары
        </Text>
      </View>
      <View>
        <ScrollView
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
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
              ? [...Array(count)].map((_, i) => <ProductCardSceleton key={i} />)
              : allProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    whatComeScreen={"home"}
                  />
                ))}
            {loading &&
              [...Array(2)].map((_, i) => <ProductCardSceleton key={i} />)}
          </View>

          {allProductsCount !== allProducts.length && (
            <View
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={moreProductsHandle}
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
        </ScrollView>
      </View>
    </View>
  );
};

export default SectionAllProducts;
