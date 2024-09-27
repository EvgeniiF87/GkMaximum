import { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { ImagePickerAsset } from "expo-image-picker";
import Layout from "../../../src/components/layout/Layout";
import Header from "../../../src/components/header/Header";
import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  AppPropsScreen,
  AppStackParamList,
} from "../../../navigation/routes/app-navigation";
import BlockBottomButtons from "../../../src/components/BlockBottomButtons/BlockBottomButtons";
import LeaveFeedbackProductCard from "../../../src/components/leave-feedback-screen/leave-feedback-product-card/LeaveFeedbackProductCard";
import LeaveFeedbackRating from "../../../src/components/leave-feedback-screen/leave-feedback-rating/LeaveFeedbackRating";
import LeaveFeedbackAboutTheProduct from "../../../src/components/leave-feedback-screen/leave-feedback-about-the-product/LeaveFeedbackAboutTheProduct";
import LeaveFeedbackAddPhoto from "../../../src/components/leave-feedback-screen/leave-feedback-add-photo/LeaveFeedbackAddPhoto";
import { useAppSelector } from "../../../src/hooks/redux";
import { useAddProductFeedbackMutation } from "../../../api/FeedbackApi/FeedbackApi";
import { useAppSpiner } from "../../../src/hooks/AppSpiner";
import { DevelopmentDebug } from "../../../src/helpers/development-debug";
import useAppAlertNotification from "../../../src/hooks/AppAlertNotification";

type LeaveFeedBackProps = {
  route: RouteProp<AppStackParamList, "LeaveFeedBack">;
};

const LeaveFeedBack: FC<LeaveFeedBackProps> = ({ route }) => {
  const { goBack } = useNavigation<AppPropsScreen>();
  const { showSpiner, hideSpiner } = useAppSpiner();
  const { alertNotification } = useAppAlertNotification();
  const { user } = useAppSelector((state) => state.userReducer);
  const { product } = route.params;

  const [addProductFeedback] = useAddProductFeedbackMutation();

  const [rating, setRating] = useState(0);
  // const [advantages, setAdvantages] = useState<string>("");
  // const [flaws, setFlaws] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [photos, setPhotos] = useState<ImagePickerAsset[]>([]);

  const [disable, setDisable] = useState<boolean>(true);

  const addProductFeedbackHandle = () => {
    showSpiner("Сохраняем отзыв. Подождите...");
    const payload = new FormData();

    payload.append("name", user.name || "");
    payload.append("item_id", `${product.id}`);
    payload.append("rate", `${rating}`);
    // if (advantages.length > 0) payload.append("advantage", advantages);
    // if (flaws.length > 0) payload.append("disadvantage", flaws);
    if (comment.length > 0) payload.append("comment", comment);

    if (photos.length > 0) {
      photos.map((photo) => {
        payload.append("file", {
          type: "image/jpg",
          name: `${photo.fileName}.jpg`,
          uri: photo.uri,
        });
      });
    }

    addProductFeedback(payload)
      .unwrap()
      .then((response) => {
        hideSpiner();
        if (response.status === "success") {
          alertNotification({
            message: "Ваш отзыв успешно добавлен",
            type: "success",
          });
          goBack();
        }
      })
      .catch((err) => {
        hideSpiner();
        alertNotification({
          message: "Ошибка. Ваш отзыв не добавлен",
          type: "error",
        });
        DevelopmentDebug(err);
      })
      .finally(() => hideSpiner());
  };

  useEffect(() => {
    if (rating > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [rating]);

  return (
    <Layout
      noMenu
      isBottomButton
      header={
        <Header title="Оставить отзыв" crossIcon crossIconHandle={goBack} />
      }
      bottomButton={
        <BlockBottomButtons
          isDisabledApplayButton={disable}
          borderTop
          titleApplayButton="Оставить отзыв"
          onPressApplayButtonHandle={addProductFeedbackHandle}
        />
      }
    >
      <View style={{ paddingBottom: 120 }}>
        <LeaveFeedbackProductCard product={product} />

        <LeaveFeedbackRating rating={rating} setRatingHandle={setRating} />

        <LeaveFeedbackAboutTheProduct
          // advantages={advantages}
          // flaws={flaws}
          comment={comment}
          // setAdvantages={setAdvantages}
          // setFlaws={setFlaws}
          setComment={setComment}
        />

        <LeaveFeedbackAddPhoto photos={photos} setPhotos={setPhotos} />
      </View>
    </Layout>
  );
};

export default LeaveFeedBack;
