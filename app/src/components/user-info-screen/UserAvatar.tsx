import { View, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import DefaultAvatar from "../../../../assets/default-avatar.png";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";
import { setUserAvatar } from "../../../store/reducers/UserSlice";
import {
  useDeleteUserAvatarMutation,
  useUpdateUserAvatarMutation,
} from "../../../api/User/UserApi";
import { DevelopmentDebug } from "../../helpers/development-debug";
import useAppAlertNotification from "../../hooks/AppAlertNotification";
import Spiner from "../spiner/Spiner";
import { useState } from "react";
import { devApiAvatarUrl } from "../../../api/config/config";

const UserAvatar = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const [fetchAvatar, setFetchAvatar] = useState(false);
  const { alertNotification } = useAppAlertNotification();
  const [deleteUserAvatar] = useDeleteUserAvatarMutation();
  const [updateUserAvatar] = useUpdateUserAvatarMutation();
  const dispatch = useAppDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) setFetchAvatar(false);

    setFetchAvatar(true);
    if (!result.canceled) {
      const payload = new FormData();

      payload.append("avatar", {
        type: "image/jpg",
        name: "avatar.jpg",
        uri: result.assets[0].uri,
      });

      await deleteUserAvatar(null)
        .unwrap()
        .then((response): void => {
          if (response.status === "success") {
            DevelopmentDebug({ avatar: response.data.user.avatar });
          }
        })
        .catch((err): void => {
          DevelopmentDebug({ err });
          alertNotification({
            message: "Ошибка удаления аватарки",
            type: "error",
          });
        });

      await updateUserAvatar(payload)
        .unwrap()
        .then((response) => {
          if (response.status === "success") {
            dispatch(setUserAvatar(response.data.user.avatar));
            setFetchAvatar(false);
            alertNotification({
              message: "Ваша автарка успешно обновлена",
              type: "success",
            });
          }
        })
        .catch((err) => {
          setFetchAvatar(false);
          alertNotification({
            message: "Ошибка загрузки аватарки",
            type: "error",
          });
          DevelopmentDebug({ err });
        });
    }
  };

  return (
    <View
      style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: "#FFB8C6",
        }}
      >
        {fetchAvatar && <Spiner />}
        <Image
          source={
            user.avatar
              ? { uri: `${devApiAvatarUrl}/${user.avatar}` }
              : DefaultAvatar
          }
          style={{
            width: 80,
            height: 80,
            resizeMode: user.avatar ? "cover" : "contain",
            borderRadius: 40,
          }}
        />

        <TouchableOpacity
          onPress={pickImage}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 80,
            height: 80,
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <Icon viewBox="26 26" size={26} path={AppIcons.app.plus()} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserAvatar;
