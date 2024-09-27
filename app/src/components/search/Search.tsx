import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";
import { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import { useAppSelector } from "../../hooks/redux";

type SearchPropsType = {
  value?: string;
  filter?: boolean;
  searchHandler?: () => void;
  onChangeHandle?: (value: string) => void;
  placeholder?: string;
  mt?: boolean;
  isDisableSearch?: boolean;
};

const Search: FC<SearchPropsType> = ({
  value,
  filter,
  searchHandler,
  onChangeHandle,
  placeholder,
  mt,
  isDisableSearch,
}) => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const { filtersCount } = useAppSelector((state) => state.FilterReducer);

  let iconColor = filtersCount.length > 0 ? "#3E3E40" : "#898E9F";

  const filterHandler = () => {
    navigate("Filter", { screen: "Main" });
  };

  return (
    <View
      style={{
        borderColor: "rgb(137, 142, 159, 0.80)",
        borderBottomWidth: 0.2,
        paddingHorizontal: 20,
        ...Platform.select({
          android: { marginTop: 10 },
          ios: { marginTop: filter || mt ? 5 : 15 },
        }),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            width: filter ? "78%" : "90%",
            paddingVertical: 10,
            fontSize: 20,
          }}
          placeholder={placeholder ? placeholder : "Товар, бренд, артикул"}
          value={value}
          onChangeText={onChangeHandle}
        />

        <View style={{ flexDirection: "row", marginRight: 5 }}>
          <TouchableOpacity onPress={searchHandler} disabled={isDisableSearch}>
            <Icon viewBox="20 20" size={22} path={AppIcons.app.search()} />
          </TouchableOpacity>

          {filter && (
            <TouchableOpacity
              style={{ marginLeft: 25 }}
              onPress={filterHandler}
            >
              <Icon
                viewBox="20 20"
                size={22}
                path={AppIcons.app.filter(iconColor)}
              />
              {filtersCount && filtersCount.length > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -12,
                    right: -14,
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
                    {filtersCount.length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Search;
