import { View, Text } from "react-native";
import Layout from "../../../src/components/layout/Layout";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import {
  useGetFullInfoOrderQuery,
  useLazyCancelOrderQuery,
  useLazyGetAllHistoryOrdersQuery,
} from "../../../api/HistoryOrdersApi/HistoryOrdersApi";
import {
  resetHistoryOrders,
  setHistoryOrders,
  setAllHistoryOrdersCount,
} from "../../../store/reducers/HistoryOrdersSlice";
import { ProfileStackParamList } from "../../../navigation/profile/profile-navigation";
import { FC, useState } from "react";
import Header from "../../../src/components/header/Header";
import OrderStatusInfo from "../../../src/components/full-info-order-screen/order-status-info/OrderStatusInfo";
import OrderSumInfo from "../../../src/components/full-info-order-screen/order-sum-info/OrderSumInfo";
import OrderProductInfoCard from "../../../src/components/full-info-order-screen/order-product-info-card/OrderProductInfoCard";
import OrderDeliveryInfo from "../../../src/components/full-info-order-screen/order-delivery-info/OrderDeliveryInfo";
import ButtonOutline from "../../../src/ui/ButtonOutline.tsx/ButtonOutline";
import CancelOrderModal from "../../../src/components/full-info-order-screen/cancel-order-modal/CancelOrderModal";
import OrderSceleton from "../../../src/components/full-info-order-screen/order-sceleton/OrderSceleton";
import useAppAlertNotification from "../../../src/hooks/AppAlertNotification";
import { useAppSpiner } from "../../../src/hooks/AppSpiner";
import { useAppDispatch } from "../../../src/hooks/redux";

type OrderFullInfoProps = {
  route: RouteProp<ProfileStackParamList, "OrderFullInfo">;
};

const OrderFullInfo: FC<OrderFullInfoProps> = ({ route }) => {
  const { goBack } = useNavigation<AppPropsScreen>();
  const { id, headerTitle } = route.params;
  const [showCancelOrderModal, setShowCancelOrderModal] =
    useState<boolean>(false);
  const [screenDimming, setScreenDimming] = useState<boolean>(false);
  const { alertNotification } = useAppAlertNotification();
  const { showSpiner, hideSpiner } = useAppSpiner();
  const [cancelOrder] = useLazyCancelOrderQuery();
  const [getAllUserHistoryOrders] = useLazyGetAllHistoryOrdersQuery();
  const { data, isLoading, refetch } = useGetFullInfoOrderQuery({ id });

  const dispatch = useAppDispatch();

  const showModal = () => {
    setScreenDimming(true);
    setShowCancelOrderModal(true);
  };

  const hideModal = () => {
    setShowCancelOrderModal(false);
    setScreenDimming(false);
  };

  const cancelOrderHandle = () => {
    hideModal();
    showSpiner("Отменяем заказ. Подождите...");
    cancelOrder({ id })
      .unwrap()
      .then((response) => {
        console.log(response);

        if (response.status === "success") {
          getAllUserHistoryOrders({
            page: 1,
            limit: 200,
          })
            .unwrap()
            .then((allHistoryOrders) => {
              if (allHistoryOrders.status === "success") {
                dispatch(resetHistoryOrders());
                dispatch(setHistoryOrders(allHistoryOrders.data.orders));
                dispatch(
                  setAllHistoryOrdersCount(allHistoryOrders.data.totalCount)
                );
                return true;
              }
            })
            .catch((err) => console.log(err));
          hideSpiner();
          alertNotification({
            message: "Ваш заказ отменён",
            type: "success",
          });
          refetch();
        }
      })
      .catch(() => {
        alertNotification({
          message: "Ошибка. Ваш заказ не отменён",
          type: "error",
        });
      });
  };

  return (
    <>
      {screenDimming && (
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(22, 22, 28, 0.3)",
            zIndex: 90,
          }}
        ></View>
      )}
      <Layout
        isNotification
        header={
          <Header
            title={`№${headerTitle}`}
            leftIcon
            navigationHandle={goBack}
          />
        }
      >
        <CancelOrderModal
          isShow={showCancelOrderModal}
          hideModalHandle={hideModal}
          cancelHandle={cancelOrderHandle}
        />

        {isLoading ? (
          <OrderSceleton />
        ) : (
          <>
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
              <OrderStatusInfo
                status={data?.data.status ? data?.data.status : "В сборке"}
                onPressCancelOrder={showModal}
              />

              <OrderSumInfo order={data?.data} />
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  lineHeight: 20.8,
                  color: "#272728",
                }}
              >
                Состав заказа {data?.data.priceData.length} / шт.
              </Text>
            </View>

            <View style={{ marginTop: 10 }}>
              {data?.data.priceData.map((product) => (
                <OrderProductInfoCard
                  key={product.title}
                  product={product}
                  status={data.data.status}
                />
              ))}
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <ButtonOutline
                title="Повторить заказ"
                onPressHandle={() => {}}
                type={"dark"}
                fontSize={16}
              />
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
              <OrderDeliveryInfo order={data?.data} />
            </View>
          </>
        )}
      </Layout>
    </>
  );
};

export default OrderFullInfo;
