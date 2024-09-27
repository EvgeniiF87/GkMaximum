import { View } from "react-native";
import AuthBasketHeaderAndAllCount from "./auth-basket-header-and-basket-all-count/AuthBasketHeaderAndAllCount";
import AuthBasketBlockCards from "./auth-basket-block-cards/AuthBasketBlockCards";
import Layout from "../../layout/Layout";
import BlockBottomButtons from "../../BlockBottomButtons/BlockBottomButtons";
import { useState } from "react";
import AuthBasketDeleteProductModal from "./auth-basket-delete-product-modal/AuthBasketDeleteProductModal";
import AuthBasketBlockOrderPrice from "./auth-basket-block-order-price/AuthBasketBlockOrderPrice";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";

const AuthBasketNotEmpty = () => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [screenDimming, setScreenDimming] = useState<boolean>(false);
  const [currentProductID, setCurrentProductID] = useState<number>(0);
  const [currentProductIsFavorites, setCurrentProductIsFavorites] =
    useState<boolean>(false);

  const showModalHandle = (isFavorites?: boolean, prodyctID?: number) => {
    setShowModal(true);
    setScreenDimming(true);
    setCurrentProductID(prodyctID ?? 0);
    setCurrentProductIsFavorites(isFavorites ?? false);
  };

  const hideModalHandle = () => {
    setShowModal(false);
    setScreenDimming(false);
  };

  const placingAnOrderHandle = () => {
    navigate("PlacingAnOrder", { screen: "Oreder" });
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
        />
      )}
      <Layout
        isBottomButton
        bottomButton={
          <BlockBottomButtons
            paddingBottom={35}
            titleApplayButton="Перейти к оформлению"
            onPressApplayButtonHandle={placingAnOrderHandle}
          />
        }
      >
        <View style={{ paddingBottom: 60 }}>
          <AuthBasketHeaderAndAllCount />
          <AuthBasketBlockCards showModalHandle={showModalHandle} />
          <AuthBasketBlockOrderPrice />
          <AuthBasketDeleteProductModal
            isShow={showModal}
            isFavorites={currentProductIsFavorites}
            productID={currentProductID}
            hideModalHandle={hideModalHandle}
          />
        </View>
      </Layout>
    </>
  );
};

export default AuthBasketNotEmpty;
