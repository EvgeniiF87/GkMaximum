import { View } from "react-native";
import HistoryOrderCard from "../../history-order-card/HistoryOrderCard";
import { useAppSelector } from "../../../hooks/redux";

const NotEmptyHistoryOrders = () => {
  const { orders } = useAppSelector((state) => state.HistoryOrdersReducer);

  return (
    <View style={{ marginTop: 20 }}>
      {orders.map((order) => (
        <HistoryOrderCard key={order.id} order={order} />
      ))}
    </View>
  );
};

export default NotEmptyHistoryOrders;
