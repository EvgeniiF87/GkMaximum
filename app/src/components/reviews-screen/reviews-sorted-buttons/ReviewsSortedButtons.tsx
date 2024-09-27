import { FC } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "../../Icon/Icon";
import { AppIcons } from "../../../Icons";

type ReviewsSortedButtonsProps = {
  activeButtonIndex: number;
  handleButtOnPress: (index: number) => void;
  newOld: boolean;
  arrowsButtonHandle: () => void;
};

const ReviewsSortedButtons: FC<ReviewsSortedButtonsProps> = ({
  activeButtonIndex,
  handleButtOnPress,
  newOld,
  arrowsButtonHandle,
}) => {
  const buttons = [
    { title: "новое" },
    { title: "высокая оценка" },
    { title: "с фото" },
    { title: "низкая оценка" },
  ];

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
      <View
        style={{ flexDirection: "row", columnGap: 10, alignItems: "center" }}
      >
        <TouchableOpacity onPress={arrowsButtonHandle}>
          <Icon
            viewBox="16 16"
            size={16}
            path={AppIcons.app.verticalArrows()}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "#272728",
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 20.8,
          }}
        >
          {newOld ? "Сначала новые" : "Сначала старые"}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        {buttons.map(({ title }, index) => (
          <TouchableOpacity
            disabled={index === activeButtonIndex ? true : false}
            key={index}
            style={[
              {
                borderRadius: 16,
                borderColor:
                  activeButtonIndex === index ? "#272728" : "#272728",
                borderWidth: activeButtonIndex !== index ? 1 : 0,
                backgroundColor:
                  activeButtonIndex !== index ? "transparent" : "#272728",
                padding: 6,
              },
            ]}
            onPress={() => handleButtOnPress(index)}
          >
            <Text
              style={{
                color: activeButtonIndex === index ? "#fff" : "#272728",
                fontSize: 10,
                fontWeight: "600",
                lineHeight: 13,
                textTransform: "uppercase",
              }}
            >
              {title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ReviewsSortedButtons;
