import { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AppIcons } from "../../Icons";
import { Icon } from "../Icon/Icon";

type BlockArrowRightPropsType = {
  title: string;
  titleColor?: string;
  titleFontSize?: number;
  marginVertical?: number;
  paddingHorizontal?: number;
  logout?: boolean;
  plus?: boolean;
  isFilter?: boolean;
  isArrow?: boolean;
  isStatusOrder?: boolean;
  statusOrder?: "В сборке" | "Доставлен" | "В пути" | "Отменён";
  isShowArrow?: boolean;
  filterTitle?: string;
  filterCount?: string[];
  notTouchable?: boolean;
  navigationHandle?: () => void;
};

const BlockArrowRight: FC<BlockArrowRightPropsType> = ({
  title,
  titleColor,
  titleFontSize,
  marginVertical,
  paddingHorizontal,
  logout,
  plus,
  isFilter,
  isArrow,
  isStatusOrder,
  statusOrder,
  isShowArrow,
  filterTitle,
  filterCount,
  notTouchable,
  navigationHandle,
}) => {
  return (
    <>
      {notTouchable ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal:
              paddingHorizontal || paddingHorizontal === 0
                ? paddingHorizontal
                : 15,
            marginVertical: marginVertical ? marginVertical : 20,
          }}
        >
          <Text
            style={{
              fontSize: titleFontSize ? titleFontSize : 20,
              fontWeight: "600",
              color: titleColor ? titleColor : "#272728",
            }}
          >
            {title}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={navigationHandle}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal:
              paddingHorizontal || paddingHorizontal === 0
                ? paddingHorizontal
                : 15,
            marginVertical: marginVertical ? marginVertical : 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text
              style={{
                fontSize: titleFontSize ? titleFontSize : 20,
                fontWeight: "600",
                color: titleColor ? titleColor : "#272728",
              }}
            >
              {title}
            </Text>
            {isFilter && filterTitle && (
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#898E9F",
                }}
              >
                {filterTitle}
              </Text>
            )}

            {isFilter && filterCount && filterCount.length > 0 && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                  borderRadius: 20,
                  width: 20,
                  height: 20,
                  backgroundColor: "#D71E56",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: "600",
                    lineHeight: 15.6,
                  }}
                >
                  {filterCount.length}
                </Text>
              </View>
            )}
          </View>

          {isStatusOrder && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                columnGap: 20,
              }}
            >
              <View
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 46,
                  backgroundColor:
                    statusOrder === "В сборке"
                      ? "#FFA1CE"
                      : statusOrder === "Доставлен"
                      ? "#CAF2D1"
                      : statusOrder === "В пути"
                      ? "#A6BFFF"
                      : "#D1D3DE",
                }}
              >
                <Text
                  style={{
                    color: "#272728",
                    fontSize: 14,
                    fontWeight: "600",
                    lineHeight: 18.2,
                  }}
                >
                  {statusOrder}
                </Text>
              </View>
              <Icon viewBox="8 14" size={15} path={AppIcons.app.arrowRight()} />
            </View>
          )}

          {!logout && !plus && !isArrow && !isStatusOrder && (
            <Icon viewBox="8 14" size={15} path={AppIcons.app.arrowRight()} />
          )}
          {isArrow && isShowArrow && (
            <Icon viewBox="8 14" size={15} path={AppIcons.app.arrowRight()} />
          )}
          {logout && (
            <Icon
              viewBox="16 18"
              size={20}
              path={AppIcons.app.logout("#272728")}
            />
          )}
          {plus && (
            <Icon
              viewBox="26 26"
              size={18}
              path={AppIcons.app.plus("#272728")}
            />
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

export default BlockArrowRight;
