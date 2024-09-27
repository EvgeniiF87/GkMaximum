import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Layout from "../../../src/components/layout/Layout";
import Header from "../../../src/components/header/Header";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import BlockBottomButtons from "../../../src/components/BlockBottomButtons/BlockBottomButtons";
import PlacingAnOrderAddress from "../../../src/components/placing-an-order-screen/placing-an-order-address/PlacingAnOrderAddress";
import PlacingAnOrderRecipient from "../../../src/components/placing-an-order-screen/placing-an-order-recipient/PlacingAnOrderRecipient";
import InputTextLabel from "../../../src/components/input/InputTextLabel";
import PlacingAnOrderTotalPriceAndBonus from "../../../src/components/placing-an-order-screen/placing-an-order-total-price-and-bonus/PlacingAnOrderTotalPriceAndBonus";
import PlacingAnOrderInfo from "../../../src/components/placing-an-order-screen/placing-an-order-info/PlacingAnOrderInfo";
import { useAppDispatch, useAppSelector } from "../../../src/hooks/redux";
import {
  setPlacingAnOrderAddressDeliveryDoorphone,
  setPlacingAnOrderAddressDeliveryEntrance,
  setPlacingAnOrderAddressDeliveryFlat,
  setPlacingAnOrderAddressDeliveryFloor,
  setPlacingAnOrderAddressDeliveryHouseStreet,
  setPlacingAnOrderItems,
  setPlacingAnOrderRecipientName,
  setPlacingAnOrderRecipientPatronymic,
  setPlacingAnOrderRecipientPhone,
  setPlacingAnOrderRecipientSurname,
  setPlacingAnOrderComment,
  resetOrder,
} from "../../../store/reducers/OrderSlice";
import {
  IPlacingAnOrder,
  IPlacingAnOrderItems,
} from "../../../entities/PlacingOrder/types/placing-order-types";
import { useAppSpiner } from "../../../src/hooks/AppSpiner";
import { orderAlert } from "../../../src/helpers/fake-order";
import { usePlacingAnOrderMutation } from "../../../api/PlacingAnOrderApi/PlacingAnOrderApi";
import { DevelopmentDebug } from "../../../src/helpers/development-debug";
import useAppAlertNotification from "../../../src/hooks/AppAlertNotification";
import { setHistoryOrder } from "../../../store/reducers/HistoryOrdersSlice";
import { setDeleteBasketProduct } from "../../../store/reducers/BasketSlice";
import { setIsShoppingCart } from "../../../store/reducers/SectionSlice";
import { setfFlteredProductIsShoppingCart } from "../../../store/reducers/FilteredProductSlice";
import { setCatalogProductIsShoppingCart } from "../../../store/reducers/CatalogProductSlice";
import { setHitsIsShoppingCart } from "../../../store/reducers/HitSlice";
import { setNewsIsShoppingCart } from "../../../store/reducers/NewsSlice";
import { setPromotionsIsShoppingCart } from "../../../store/reducers/PromotionsSlice";

const PlacingAnOreder = () => {
  const { goBack } = useNavigation<AppPropsScreen>();
  const { showSpiner, hideSpiner } = useAppSpiner();
  const { alertNotification } = useAppAlertNotification();
  const [orderDisabled, setOrderDisabled] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.userReducer);
  const { products } = useAppSelector((state) => state.basketReducer);
  const order = useAppSelector((state) => state.OrderReducer);
  const dispatch = useAppDispatch();

  const [placingAnOrder] = usePlacingAnOrderMutation();

  useEffect(() => {
    if (user.my_address) {
      user.my_address.map((address): void => {
        if (address.isMain === 1) {
          dispatch(
            setPlacingAnOrderAddressDeliveryHouseStreet(
              address.house_street ?? ""
            )
          );
          dispatch(setPlacingAnOrderAddressDeliveryFlat(address.flat ?? ""));
          dispatch(setPlacingAnOrderAddressDeliveryFloor(address.floor ?? ""));
          dispatch(
            setPlacingAnOrderAddressDeliveryEntrance(address.entrance ?? "")
          );
          dispatch(
            setPlacingAnOrderAddressDeliveryDoorphone(address.doorphone ?? "")
          );
        }
      });
    }
  }, [user]);

  useEffect(() => {
    const orderItems: IPlacingAnOrderItems[] = [];

    products.map((product): void => {
      if (product.in_stock === 1) {
        orderItems.push({ item_id: product.id, count: product.count });
      }
    });

    dispatch(setPlacingAnOrderItems(orderItems));
  }, [products]);

  useEffect(() => {
    if (order?.recipient?.phone?.length === 0) {
      dispatch(setPlacingAnOrderRecipientPhone(user.phone ?? ""));
    }
    if (order?.recipient?.name?.length === 0) {
      dispatch(setPlacingAnOrderRecipientName(user.name ?? ""));
    }
    if (order?.recipient?.surname?.length === 0) {
      dispatch(setPlacingAnOrderRecipientSurname(user.surname ?? ""));
    }
    if (order?.recipient?.patronymic?.length === 0) {
      dispatch(setPlacingAnOrderRecipientPatronymic(user.patronymic ?? ""));
    }
  }, []);

  useEffect(() => {
    if (
      order.recipient.name &&
      order.recipient.surname &&
      order.recipient.phone &&
      order.address_delivery.house_street &&
      order?.recipient?.name?.length > 0 &&
      order.recipient.surname.length > 0 &&
      order.recipient.phone.length > 0 &&
      order.address_delivery.house_street.length > 0
    ) {
      setOrderDisabled(false);
    } else {
      setOrderDisabled(true);
    }
  }, [orderDisabled, order]);

  const onChangeCommentHandle = (value: string) => {
    dispatch(setPlacingAnOrderComment(value));
  };

  const orderHandle = () => {
    showSpiner("Оформляем заказ. Подождите...");
    const payload: IPlacingAnOrder = {
      items: order.items,
      address_delivery: {
        house_street: order.address_delivery?.house_street?.length
          ? order.address_delivery.house_street
          : undefined,
        flat: order.address_delivery?.flat?.length
          ? order.address_delivery.flat
          : undefined,
        floor: order.address_delivery?.floor?.length
          ? order.address_delivery.floor
          : undefined,
        doorphone: order.address_delivery?.doorphone?.length
          ? order.address_delivery.doorphone
          : undefined,
        entrance: order.address_delivery?.entrance?.length
          ? order.address_delivery.entrance
          : undefined,
      },
      recipient: {
        name: order.recipient.name?.length ? order.recipient.name : undefined,
        surname: order.recipient.surname?.length
          ? order.recipient.surname
          : undefined,
        patronymic: order.recipient.patronymic?.length
          ? order.recipient.patronymic
          : undefined,
        phone: order.recipient.phone?.length
          ? order.recipient.phone
          : undefined,
      },
      comment: order.comment?.length ? order.comment : undefined,
      used_bonus: order.used_bonus,
    };
    placingAnOrder(payload)
      .unwrap()
      .then((response): void => {
        DevelopmentDebug(response);
        if (response.status === "success") {
          order.items.map(({ item_id }) => {
            dispatch(setDeleteBasketProduct(item_id));
            dispatch(setIsShoppingCart({ id: item_id }));
            dispatch(setfFlteredProductIsShoppingCart({ id: item_id }));
            dispatch(setCatalogProductIsShoppingCart({ id: item_id }));
            dispatch(setHitsIsShoppingCart({ id: item_id }));
            dispatch(setNewsIsShoppingCart({ id: item_id }));
            dispatch(setPromotionsIsShoppingCart({ id: item_id }));
          });
          dispatch(resetOrder());
          dispatch(setHistoryOrder(response.data));
          hideSpiner();
          orderAlert(goBack);
        }
      })
      .catch((err) => {
        hideSpiner();
        alertNotification({
          message: err.data.message,
          type: "error",
        });
        DevelopmentDebug(err);
      });
  };

  return (
    <Layout
      noMenu
      isNotification
      header={
        <Header title="Оформление заказа" leftIcon navigationHandle={goBack} />
      }
      isBottomButton
      bottomButton={
        <BlockBottomButtons
          titleApplayButton="Заказать на сайте"
          borderTop
          isDisabledApplayButton={orderDisabled}
          onPressApplayButtonHandle={orderHandle}
        />
      }
    >
      <PlacingAnOrderAddress />
      <PlacingAnOrderRecipient />

      <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            lineHeight: 20.8,
            color: "#272728",
          }}
        >
          Оставьте комментарий к заказу
        </Text>
        <InputTextLabel
          value={order.comment ?? ""}
          label="Комментарий"
          _styles={{ marginTop: 10 }}
          onChange={onChangeCommentHandle}
        />
      </View>

      <PlacingAnOrderTotalPriceAndBonus />
      <PlacingAnOrderInfo />
    </Layout>
  );
};

export default PlacingAnOreder;
