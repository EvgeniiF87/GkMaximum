import { View, Text, ScrollView } from "react-native";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";
import ProductCard from "../product-card/ProductCard";
import ProductCardSceleton from "../product-card/card-sceleton/ProductCardSceleton";
import { FC } from "react";
import { IFavoriteData } from "../../../entities/Favorite/types/favorite-types";
import NotificationsAlert from "../alert-notification/AlertNotification";

type AuthFavoriteEmptyProps = {
  data: IFavoriteData | undefined;
  isLoading: boolean;
};

const AuthFavoriteEmpty: FC<AuthFavoriteEmptyProps> = ({ data, isLoading }) => {
  return (
    <>
      {data?.items.length ? (
        <View style={{ flex: 1 }}>
          <NotificationsAlert />
          <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#272728",
                lineHeight: 23.4,
              }}
            >
              Избранное
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "#272728",
                lineHeight: 22.4,
              }}
            >
              Количество продуктов: {data?.totalCount} шт.
            </Text>
          </View>
          <View style={{ flex: 1, paddingBottom: 60 }}>
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
                  ? [...Array(6)].map((_, i) => <ProductCardSceleton key={i} />)
                  : data?.items.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        whatComeScreen={"home"}
                      />
                    ))}
              </View>
            </ScrollView>
          </View>
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "500",
                color: "#272728",
              }}
            >
              Пока тут пусто
            </Text>
          </View>

          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "300",
                color: "#272728",
              }}
            >
              Сохраняй понравившиеся товары поставив:{" "}
            </Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Icon
              viewBox="24 24"
              size={30}
              path={AppIcons.tabNavigationIcons.favorites("#DE002B")}
            />
          </View>

          <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "300",
                color: "#272728",
              }}
            >
              на карточке товара
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default AuthFavoriteEmpty;
