import { FC } from "react";
import { View, Text } from "react-native";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";

type EmptySearchOrFilteredResultProps = {
  type: "search" | "filtered";
};

const EmptySearchOrFilteredResult: FC<EmptySearchOrFilteredResultProps> = ({
  type,
}) => {
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          width: 40,
          height: 40,
          backgroundColor: "#D71E56",
          // backgroundColor: "#DE002B",
          // backgroundColor: "#FFA1CE",
          borderRadius: 30,
        }}
      >
        {type === "search" && (
          <Icon viewBox="20 20" size={20} path={AppIcons.app.search("#fff")} />
        )}

        {type === "filtered" && (
          <Icon viewBox="20 20" size={20} path={AppIcons.app.filter("#fff")} />
        )}
      </View>
      <View
        style={{
          width: "70%",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            color: "#272728",
            lineHeight: 20.8,
            textAlign: "center",
          }}
        >
          К сожалению по вашему запросу{" "}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#272728",
              lineHeight: 20.8,
            }}
          >
            ничего не найдено
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default EmptySearchOrFilteredResult;
