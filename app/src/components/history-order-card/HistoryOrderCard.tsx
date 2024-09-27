import { View, Text, Image } from "react-native";
import BlockArrowRight from "../block-arrow-right/BlockArrowRight";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";
import { FC } from "react";
import { IHistoryOrder } from "../../../entities/history-orders/types/history-orders";
import { devApiImgUrl } from "../../../api/config/config";
import { convertDateToDayAndMonth } from "../../helpers/convert-date";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";

type HistoryOrderCardProps = {
  order: IHistoryOrder;
};

const HistoryOrderCard: FC<HistoryOrderCardProps> = ({ order }) => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const {
    id,
    date_create,
    date_delivery,
    img,
    prettier_id,
    price_result,
    status,
  } = order;

  const orderFullInfoHandle = () => {
    navigate("Main", {
      screen: "Tabs",
      params: {
        screen: "TabProfile",
        params: {
          screen: "OrderFullInfo",
          params: { id, headerTitle: prettier_id },
        },
      },
    });
  };

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: "#D1D3DE",
      }}
    >
      <BlockArrowRight
        title={`№${prettier_id} (Курьер)`}
        titleFontSize={14}
        titleColor={status === "Отменён" ? "#898E9F" : "#272728"}
        isStatusOrder
        statusOrder={status}
        navigationHandle={orderFullInfoHandle}
      />
      <View style={{ paddingHorizontal: 20, paddingBottom: 8 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "70%",
          }}
        >
          <Text
            style={{
              color: "#272728",
              fontSize: 12,
              fontWeight: "400",
              lineHeight: 15.6,
            }}
          >
            {convertDateToDayAndMonth(date_create)}
          </Text>

          {status === "Доставлен" && (
            <Text
              style={{
                color: "#272728",
                fontSize: 12,
                fontWeight: "400",
                lineHeight: 15.6,
              }}
            >
              {convertDateToDayAndMonth(date_delivery)}
            </Text>
          )}
        </View>

        <View style={{ width: "70%", marginTop: 5 }}>
          {status === "Доставлен" && (
            <Icon
              viewBox="239 20"
              height={22}
              width={"100%"}
              path={AppIcons.app.endDeliverySvg()}
            />
          )}

          {(status === "В сборке" || status === "В пути") && (
            <Icon
              viewBox="119 20"
              height={22}
              width={119}
              path={AppIcons.app.startDeliverySvg()}
            />
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "70%",
            marginTop: 5,
          }}
        >
          <Text
            style={{
              color: "#898E9F",
              fontSize: 10,
              fontWeight: "600",
              lineHeight: 10.4,
            }}
          >
            Дата заказа
          </Text>

          {status === "Доставлен" && (
            <Text
              style={{
                color: "#898E9F",
                fontSize: 10,
                fontWeight: "600",
                lineHeight: 10.4,
              }}
            >
              Дата получения
            </Text>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View style={{ flexDirection: "row", columnGap: 10 }}>
            {img.map((image) => (
              <Image
                key={image}
                source={{ uri: `${devApiImgUrl}/${image}` }}
                style={{ width: 50, height: 45, resizeMode: "cover" }}
              />
            ))}
          </View>
          <Text
            style={{
              color: status === "Отменён" ? "#898E9F" : "#272728",
              fontSize: 14,
              fontWeight: "600",
              lineHeight: 18.2,
            }}
          >
            Сумма: {price_result} ₽
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HistoryOrderCard;
