import { FC } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";

interface BlockRadioButtonsProps {
  variant: "horizontal" | "vertical";
  list: { label: string; value: string | number | boolean }[];
  selected: string | number | undefined | boolean;
  onSelect: (value: string | number | boolean, label?: string) => void;
  columnGap?: number;
  rowGap?: number;
  _styles?: StyleProp<ViewStyle>;
}

const BlockRadioButtons: FC<BlockRadioButtonsProps> = ({
  variant,
  list,
  selected,
  onSelect,
  columnGap,
  rowGap,
  _styles,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: variant === "horizontal" ? "row" : "column",
          columnGap: columnGap ? columnGap : 0,
          rowGap: rowGap ? rowGap : 0,
        },
        _styles,
      ]}
    >
      {list.map((option, i) => (
        <TouchableOpacity
          key={i}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
          onPress={() => onSelect(option.value, option.label)}
        >
          <View
            style={{
              height: 18,
              width: 18,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: selected === option.value ? "#DE002B" : "#272728",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selected === option.value && (
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: "#DE002B",
                }}
              />
            )}
          </View>
          <Text
            style={{
              marginLeft: 6,
              fontSize: 16,
              color: "#272728",
              fontWeight: "600",
            }}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BlockRadioButtons;
