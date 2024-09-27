import EmptyHistoryOrders from "../../../src/components/history-orders-screen/emty-history-orders/EmptyHistoryOrders";
import Layout from "../../../src/components/layout/Layout";
import Header from "../../../src/components/header/Header";
import { useNavigation } from "@react-navigation/native";
import NotEmptyHistoryOrders from "../../../src/components/history-orders-screen/not-empty-history-orders/NotEmptyHistoryOrders";
import { useAppSelector } from "../../../src/hooks/redux";

const HistoryOrders = () => {
  const { goBack } = useNavigation();
  const { orders } = useAppSelector((state) => state.HistoryOrdersReducer);

  return (
    <Layout
      isEmpty={orders.length > 0 ? false : true}
      isNotification
      header={
        <Header title="История заказов" leftIcon navigationHandle={goBack} />
      }
    >
      {orders.length > 0 ? <NotEmptyHistoryOrders /> : <EmptyHistoryOrders />}
    </Layout>
  );
};

export default HistoryOrders;
