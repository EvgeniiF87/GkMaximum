import { FC } from "react";
import { View, Text } from "react-native";
import InputTextLabel from "../../input/InputTextLabel";

type LeaveFeedbackAboutTheProductProps = {
  // advantages: string; // Достоинства
  // flaws: string; // Недостатки
  comment: string; // Комментарий
  // setAdvantages: (value: string) => void;
  // setFlaws: (value: string) => void;
  setComment: (value: string) => void;
};

const LeaveFeedbackAboutTheProduct: FC<LeaveFeedbackAboutTheProductProps> = ({
  // advantages,
  // flaws,
  comment,
  // setAdvantages,
  // setFlaws,
  setComment,
}) => {
  return (
    <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          lineHeight: 20.8,
          color: "#272728",
          marginBottom: 40,
        }}
      >
        Расскажите ваше мнение о продукте
      </Text>

      {/* <InputTextLabel
        value={advantages}
        onChange={setAdvantages}
        label="Достоинства"
      />

      <InputTextLabel
        value={flaws}
        onChange={setFlaws}
        label="Недостатки"
        _styles={{ marginTop: 20 }}
      /> */}

      <InputTextLabel
        value={comment}
        onChange={setComment}
        label="Комментарий"
        _styles={{ marginTop: 20 }}
      />
    </View>
  );
};

export default LeaveFeedbackAboutTheProduct;
