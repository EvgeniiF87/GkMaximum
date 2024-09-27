import React, { FC, useState } from "react";
import {
  StyleProp,
  ViewStyle,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";

type objectListType = {
  label: string;
  value: number;
};

interface BlockCheckboxButtonsProps {
  variant: "horizontal" | "vertical";
  list?: string[];
  objectList?: objectListType[];
  selected?: string[];
  selectedObject?: number[];
  onSelect?: (value: string) => void;
  onSelectObject?: (value: number) => void;
  columnGap?: number;
  rowGap?: number;
  _styles?: StyleProp<ViewStyle>;
}

const BlockCheckboxButtons: FC<BlockCheckboxButtonsProps> = ({
  variant,
  list,
  objectList,
  selected,
  onSelect,
  selectedObject,
  onSelectObject,
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
      {list &&
        list.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSelect && onSelect(option)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: selected?.includes(option)
                    ? "#D71E56"
                    : "#3E3E40",
                  backgroundColor: selected?.includes(option)
                    ? "#D71E56"
                    : "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                {selected?.includes(option) && (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Icon
                      viewBox="50 35"
                      size={12}
                      path={AppIcons.app.checkMark("#fff")}
                    />
                  </View>
                )}
              </View>
              <Text
                style={{
                  color: "#272728",
                  fontWeight: "600",
                  fontSize: 16,
                  lineHeight: 20.8,
                }}
              >
                {option}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

      {objectList &&
        objectList.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectObject && onSelectObject(option.value)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: selectedObject?.includes(option.value)
                    ? "#D71E56"
                    : "#3E3E40",
                  backgroundColor: selectedObject?.includes(option.value)
                    ? "#D71E56"
                    : "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                {selectedObject?.includes(option.value) && (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Icon
                      viewBox="50 35"
                      size={12}
                      path={AppIcons.app.checkMark("#fff")}
                    />
                  </View>
                )}
              </View>
              <Text
                style={{
                  color: "#272728",
                  fontWeight: "600",
                  fontSize: 16,
                  lineHeight: 20.8,
                }}
              >
                {option.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default BlockCheckboxButtons;
