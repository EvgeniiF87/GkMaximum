import { FC } from "react";
import { Image, View, TouchableOpacity, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ButtonOutline from "../../../ui/ButtonOutline.tsx/ButtonOutline";
import { Icon } from "../../Icon/Icon";
import { AppIcons } from "../../../Icons";

type LeaveFeedbackAddPhotoProps = {
  photos: ImagePicker.ImagePickerAsset[];
  setPhotos: (value: ImagePicker.ImagePickerAsset[]) => void;
};

const LeaveFeedbackAddPhoto: FC<LeaveFeedbackAddPhotoProps> = ({
  photos,
  setPhotos,
}) => {
  const addPhotoHandle = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) setPhotos(result.assets);
  };

  const deletePhote = (id: string | undefined | null) => {
    const photosArr = photos.filter((p) => p.assetId !== id);
    setPhotos(photosArr);
  };

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
      {photos && photos.length > 0 && (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1, paddingVertical: 10, paddingRight: 20 }}
        >
          <View
            style={{
              marginBottom: 10,
              paddingRight: 20,
              flexDirection: "row",
              columnGap: 20,
            }}
          >
            {photos.length > 0 &&
              photos.map((photo) => (
                <View key={photo.assetId}>
                  <TouchableOpacity
                    onPress={() => deletePhote(photo.assetId)}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 18,
                      height: 18,
                      backgroundColor: "#D81E55",
                      position: "absolute",
                      top: -6,
                      right: -6,
                      borderRadius: 6,
                      zIndex: 10,
                    }}
                  >
                    <Icon
                      viewBox="24 24"
                      size={14}
                      path={AppIcons.app.cross("#fff")}
                    />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: photo.uri }}
                    style={{
                      width: 60,
                      height: 60,
                      resizeMode: "cover",
                      borderRadius: 4,
                    }}
                  />
                </View>
              ))}
          </View>
        </ScrollView>
      )}
      <ButtonOutline
        title="Прикрепить фото"
        onPressHandle={addPhotoHandle}
        type={"dark"}
      />
    </View>
  );
};

export default LeaveFeedbackAddPhoto;
