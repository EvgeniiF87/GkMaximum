import React, { useState } from "react";
import Layout from "../../../src/components/layout/Layout";
import Header from "../../../src/components/header/Header";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, Text } from "react-native";
import VexelInfo from "../../../src/components/vexel-info/VexelInfo";
import DeliveryInfo from "../../../src/components/delivery-info/DeliveryInfo";
import { useAppSelector } from "../../../src/hooks/redux";

const VexelAndDelivery = () => {
  const { goBack } = useNavigation();
  const [vexelTab, setVexelTab] = useState(true);
  const [deliveryTab, setDeliveryTab] = useState(false);
  const { user } = useAppSelector((state) => state.userReducer);
  return (
    <Layout
      header={
        <Header
          title={user.id !== 169 ? "Доставка и оплата" : "Доставка"}
          navigationHandle={goBack}
          leftIcon
        />
      }
    >
      {user.id !== 169 ? (
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setVexelTab(!vexelTab);
                setDeliveryTab(!deliveryTab);
              }}
              style={{
                borderBottomColor: vexelTab ? "#DE002B" : "transparent",
                borderBottomWidth: vexelTab ? 0.8 : 0,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: vexelTab ? "#272728" : "#898E9F",
                  fontWeight: "600",
                  paddingBottom: 2,
                }}
              >
                Оплата
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setVexelTab(!vexelTab);
                setDeliveryTab(!deliveryTab);
              }}
              style={{
                marginLeft: 20,
                borderBottomColor: deliveryTab ? "#DE002B" : "transparent",
                borderBottomWidth: deliveryTab ? 0.8 : 0,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: deliveryTab ? "#272728" : "#898E9F",
                  fontWeight: "600",
                  paddingBottom: 2,
                }}
              >
                Доставка
              </Text>
            </TouchableOpacity>
          </View>

          {vexelTab && <VexelInfo />}
          {deliveryTab && <DeliveryInfo />}
        </View>
      ) : (
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 18,
                  color: "#272728",
                  fontWeight: "600",
                  paddingBottom: 2,
                }}
              >
                Доставка
              </Text>
            </View>
          </View>

          <DeliveryInfo />
        </View>
      )}
    </Layout>
  );
};

export default VexelAndDelivery;
