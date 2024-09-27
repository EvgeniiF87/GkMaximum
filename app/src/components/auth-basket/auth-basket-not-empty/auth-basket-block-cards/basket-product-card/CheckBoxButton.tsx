import { FC } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Icon } from "../../../../Icon/Icon";
import { AppIcons } from "../../../../../Icons";
import { useAppDispatch } from "../../../../../hooks/redux";
import { setSelected } from "../../../../../../store/reducers/BasketSlice";

type CheckBoxButtonProps = {
  id: number;
  selected: boolean;
};

const CheckBoxButton: FC<CheckBoxButtonProps> = ({ selected, id }) => {
  const dispatch = useAppDispatch();

  const onPressHandle = () => {
    dispatch(setSelected({ id }));
  };

  return (
    <TouchableWithoutFeedback onPress={onPressHandle}>
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: selected ? "#D71E56" : "#3E3E40",
          backgroundColor: selected ? "#D71E56" : "#fff",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 5,
        }}
      >
        {selected && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Icon
              viewBox="50 35"
              size={12}
              path={AppIcons.app.checkMark("#fff")}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CheckBoxButton;
