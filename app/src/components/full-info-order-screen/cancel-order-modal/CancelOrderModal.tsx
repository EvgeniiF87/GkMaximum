import { FC } from "react";
import { Modal, View, Text } from "react-native";
import ButtonOutline from "../../../ui/ButtonOutline.tsx/ButtonOutline";

type CancelOrderModalProps = {
  isShow: boolean;
  hideModalHandle: () => void;
  cancelHandle: () => void;
};

const CancelOrderModal: FC<CancelOrderModalProps> = ({
  isShow,
  hideModalHandle,
  cancelHandle,
}) => {
  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={isShow}
      presentationStyle={"overFullScreen"}
    >
      <View
        style={{
          paddingHorizontal: 20,
          width: "100%",
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 0,
          paddingTop: 20,
          paddingBottom: 50,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            lineHeight: 20.8,
            color: "#272728",
            textAlign: "center",
          }}
        >
          Точно отменить заказ?
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 22.4,
            color: "#898E9F",
            textAlign: "center",
            marginTop: 5,
          }}
        >
          Деньги будут возвращенны в течение n дней
        </Text>

        <ButtonOutline
          title="Отменить"
          paddingVertical={11}
          onPressHandle={cancelHandle}
          fontSize={16}
          type={"dark"}
          _styles={{ marginTop: 20, flex: 0 }}
        />
        <ButtonOutline
          title="Назад"
          paddingVertical={11}
          onPressHandle={hideModalHandle}
          fontSize={16}
          type={"dark"}
          _styles={{ marginTop: 20, flex: 0 }}
        />
      </View>
    </Modal>
  );
};

export default CancelOrderModal;
