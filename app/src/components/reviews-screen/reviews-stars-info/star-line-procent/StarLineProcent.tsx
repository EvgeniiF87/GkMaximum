import { FC } from "react";
import { View, Text } from "react-native";
import { Icon } from "../../../Icon/Icon";
import { AppIcons } from "../../../../Icons";

type StarLineProcentProps = {
  procent: number;
  numberStar: string;
};

const StarLineProcent: FC<StarLineProcentProps> = ({ procent, numberStar }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 6,
      }}
    >
      <Text
        style={{
          color: "#272728",
          fontSize: 12,
          fontWeight: "600",
          lineHeight: 15.6,
        }}
      >
        {numberStar}
      </Text>

      <Icon viewBox="8 8" size={10} path={AppIcons.app.star()} />

      <View style={{ width: "100%", height: 2, backgroundColor: "#D1D3DE" }}>
        <View
          style={{
            position: "absolute",
            width: `${procent}%`,
            height: 2,
            left: 0,
            top: 0,
            backgroundColor: "#272728",
            zIndex: 10,
          }}
        ></View>
      </View>
    </View>
  );
};

export default StarLineProcent;
