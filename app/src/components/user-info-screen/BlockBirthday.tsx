import { useState } from "react";
import { setUserBirthday } from "../../../store/reducers/UserSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import InputTextLabel from "../input/InputTextLabel";
import { convertDate } from "../../helpers/convert-date";

const BlockBirthday = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const dispatch = useAppDispatch();

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const onFocusInputHandle = () => {
    setDatePickerVisible(true);
  };

  const handleConfirm = (value: Date) => {
    dispatch(setUserBirthday(value.toLocaleString().substring(0, 10)));
    hideDatePicker();
  };

  return (
    <>
      <InputTextLabel
        value={user.birthday}
        label="Дата рождения"
        focusHandle={onFocusInputHandle}
        caretHidden={true}
        showSoftInputOnFocus={false}
        _styles={{ marginTop: 20 }}
      />

      <DateTimePickerModal
        date={
          user.birthday
            ? new Date(`${convertDate(user.birthday, true)}`)
            : new Date()
        }
        isVisible={datePickerVisible}
        mode="date"
        display={"spinner"}
        cancelTextIOS="Отменить"
        confirmTextIOS="Выбрать"
        buttonTextColorIOS="#B02323"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default BlockBirthday;
