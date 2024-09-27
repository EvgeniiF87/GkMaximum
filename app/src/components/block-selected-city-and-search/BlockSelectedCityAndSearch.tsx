import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import { useAppSelector } from "../../hooks/redux";

const BlockSelectedCityAndSearch = () => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const { name } = useAppSelector((state) => state.RegionReducer);

  const searchHandler = () => {
    navigate("Search", { searchQuery: "" });
  };

  const selectedCityHandler = () => {
    navigate("Main", {
      screen: "Tabs",
      params: {
        screen: "TabHome",
        params: { screen: "SelectionCity", params: { type: "home" } },
      },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        borderColor: "rgb(137, 142, 159, 0.80)",
        borderBottomWidth: 0.2,
        paddingHorizontal: 20,
        paddingBottom: 10,
        ...Platform.select({
          android: { marginTop: 40 },
          ios: { marginTop: 15 },
        }),
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={selectedCityHandler}
        >
          <Icon
            viewBox="8 14"
            size={15}
            path={AppIcons.app.arrowRight()}
            styles={{ transform: [{ rotate: "90deg" }] }}
          />
          <Text style={{ marginLeft: 10, fontSize: 16 }}>г. {name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={searchHandler}>
          <Icon viewBox="20 20" size={22} path={AppIcons.app.search()} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlockSelectedCityAndSearch;
