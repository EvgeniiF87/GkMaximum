import { FC } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import { IMyAddress } from "../../../entities/MyAddress/types/my-address-types";

interface BlockAddressRadioButtonsProps {
  list: IMyAddress[] | [];
  onSelect: (value: IMyAddress) => void;
  rowGap?: number;
  _styles?: StyleProp<ViewStyle>;
}

const BlockAddressRadioButtons: FC<BlockAddressRadioButtonsProps> = ({
  list,
  onSelect,
  rowGap,
  _styles,
}) => {
  const { navigate } = useNavigation<AppPropsScreen>();

  const editAdressHandle = (address: IMyAddress) => {
    navigate("AddAddress", { type: "edit", address });
  };

  return (
    <View
      style={[
        {
          rowGap: rowGap ? rowGap : 0,
        },
        _styles,
      ]}
    >
      {list.map((option) => (
        <View
          key={option.id}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // alignItems: "center",
          }}
        >
          <TouchableOpacity
            key={option.id}
            style={{ flexDirection: "row" }}
            onPress={() => onSelect(option)}
          >
            <View style={{ alignItems: "flex-start" }}>
              <View
                style={{
                  height: 18,
                  width: 18,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: option.isMain === 1 ? "#DE002B" : "#272728",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {option.isMain === 1 && (
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
            </View>

            <View style={{ marginLeft: 8 }}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#272728",
                    fontWeight: "600",
                  }}
                >
                  {option.house_street}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {option.flat && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#898E9F",
                      fontWeight: "400",
                      lineHeight: 22.4,
                    }}
                  >
                    кв / офис {option.flat},{" "}
                  </Text>
                )}

                {option.entrance && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#898E9F",
                      fontWeight: "400",
                      lineHeight: 22.4,
                    }}
                  >
                    подъезд {option.entrance},{" "}
                  </Text>
                )}

                {option.floor && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#898E9F",
                      fontWeight: "400",
                      lineHeight: 22.4,
                    }}
                  >
                    этаж {option.floor}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => editAdressHandle(option)}
            style={{ alignItems: "flex-start" }}
          >
            <Icon viewBox="19 18" size={18} path={AppIcons.app.editPaint()} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default BlockAddressRadioButtons;
