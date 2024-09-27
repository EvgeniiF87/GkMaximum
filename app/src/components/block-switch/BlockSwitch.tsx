import { FC } from "react";
import { View, Text } from "react-native";
import SwitchCustom from "expo-custom-switch";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setFilterSale } from "../../../store/reducers/FilterSlice";

type BlockSwitchPropsType = {
  title: string;
  titleFontSize?: number;
  marginVertical?: number;
  paddingHorizontal?: number;
  isLocal?: boolean;
  localValue?: boolean;
  localOnChangeHandler?: (value: boolean) => void;
};

const BlockSwitch: FC<BlockSwitchPropsType> = ({
  title,
  titleFontSize,
  marginVertical,
  paddingHorizontal,
  isLocal,
  localValue,
  localOnChangeHandler,
}) => {
  const { filterSale } = useAppSelector((state) => state.FilterReducer);
  const dispatch = useAppDispatch();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: paddingHorizontal,
        marginVertical: marginVertical ? marginVertical : 20,
      }}
    >
      <Text
        style={{
          fontSize: titleFontSize ? titleFontSize : 20,
          fontWeight: "600",
          color: "#272728",
        }}
      >
        {title}
      </Text>
      <SwitchCustom
        value={isLocal ? localValue || false : filterSale}
        onChange={
          isLocal
            ? (value) => {
                if (localOnChangeHandler) {
                  localOnChangeHandler(value);
                } else {
                  (() => {})();
                }
              }
            : (value) => dispatch(setFilterSale(value))
        }
        rightColor="#DE002B"
        leftColor="#D1D3DE"
        iconRight={{
          color: "#fff",
          style: {
            height: 0,
            width: 0,
          },
        }}
        iconLeft={{
          color: "#fff",
        }}
      />
    </View>
  );
};

export default BlockSwitch;
