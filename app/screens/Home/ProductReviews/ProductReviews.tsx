import { FC, useState } from "react";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import Layout from "../../../src/components/layout/Layout";
import Header from "../../../src/components/header/Header";
import { RouteProp, useNavigation } from "@react-navigation/native";
import ReviewsStarsInfo from "../../../src/components/reviews-screen/reviews-stars-info/ReviewsStarsInfo";
import ReviewsPhotoSlider from "../../../src/components/reviews-screen/reviews-photo-slider/ReviewsPhotoSlider";
import ReviewsSortedButtons from "../../../src/components/reviews-screen/reviews-sorted-buttons/ReviewsSortedButtons";
import ReviewsCommentCard from "../../../src/components/reviews-screen/reviews-comment-card/ReviewsCommentCard";
import ReviewsCommentCardSceleton from "../../../src/components/reviews-screen/reviews-sceleton/reviews-comment-card-sceleton/ReviewsCommentCardSceleton";
import { useAppDispatch, useAppSelector } from "../../../src/hooks/redux";
import {
  useLazyGetReviewsCommentsQuery,
  useGetSortedReviewsCommentsMutation,
} from "../../../api/ReviewsApi/ReviewsApi";
import {
  setReviews,
  setPage,
  setSorted,
  setIsLoading,
  setAllReviewsCount,
  resetReviews,
} from "../../../store/reducers/ReviewsSlice";
import { DevelopmentDebug } from "../../../src/helpers/development-debug";
import { HomeStackParamList } from "../../../navigation/home/home-navigation";
import { IRequestReviewsComments } from "../../../entities/Reviews/types/reviews-types";

type ProductReviewsProps = {
  route: RouteProp<HomeStackParamList, "ProductReviews">;
};

const ProductReviews: FC<ProductReviewsProps> = ({ route }) => {
  const { goBack } = useNavigation();
  const { id } = route.params;
  const {
    reviewsStatistics,
    reviews,
    allReviewsCount,
    page,
    isLoading,
    sorted,
  } = useAppSelector((state) => state.ReviewsReducer);
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);
  const [reviewsCount] = useState<number>(allReviewsCount);
  const [newOld, setNewOld] = useState<boolean>(true);

  const [getReviewsComments, { isLoading: loading, isFetching }] =
    useLazyGetReviewsCommentsQuery();

  const [getSortedReviewsComments, { isLoading: sortedLoading, isSuccess }] =
    useGetSortedReviewsCommentsMutation();

  const dispatch = useAppDispatch();

  const handleButtOnPress = (index: number) => {
    setActiveButtonIndex(index);
    if (index === 0) setNewOld(true);

    dispatch(setIsLoading(true));
    dispatch(setAllReviewsCount(0));
    dispatch(setPage(1));
    dispatch(resetReviews());
    dispatch(setSorted(true));

    const payload: IRequestReviewsComments = {
      item_id: id ?? 0,
      new: index === 0 ? true : false,
      old: !newOld ? true : false,
      highScore: index === 1 ? true : false,
      lowScore: index === 3 ? true : false,
      isImage: index === 2 ? true : false,
      page: 1,
      limit: 10,
    };

    getSortedReviewsComments(payload)
      .unwrap()
      .then((response): void => {
        console.log(response.data.feedback);

        if (response.status === "success") {
          dispatch(setAllReviewsCount(response.data.totalCount));
          dispatch(setPage(Number(response.data.page)));
          dispatch(setReviews(response.data.feedback));
          dispatch(setIsLoading(false));
        }
      })
      .catch((err: any) => {
        DevelopmentDebug({ err });
      });
  };

  const newOldReviewsHandle = () => {
    setNewOld(!newOld);
    dispatch(setIsLoading(true));
    dispatch(setAllReviewsCount(0));
    dispatch(setPage(1));
    dispatch(resetReviews());
    setActiveButtonIndex(4);
    dispatch(setSorted(true));

    const payload: IRequestReviewsComments = {
      item_id: id ?? 0,
      new: !newOld ? true : false,
      old: newOld ? true : false,
      highScore: false,
      lowScore: false,
      isImage: true,
      page: 1,
      limit: 10,
    };

    getSortedReviewsComments(payload)
      .unwrap()
      .then((response): void => {
        console.log(response.data.feedback);

        if (response.status === "success") {
          dispatch(setAllReviewsCount(response.data.totalCount));
          dispatch(setPage(Number(response.data.page)));
          dispatch(setReviews(response.data.feedback));
          dispatch(setIsLoading(false));
        }
      })
      .catch((err: any) => {
        DevelopmentDebug({ err });
      });
  };

  const moreReviewsCommentsHandle = async () => {
    if (sorted) {
      const payload: IRequestReviewsComments = {
        item_id: id ?? 0,
        new: newOld || activeButtonIndex === 0 ? true : false,
        old: !newOld ? true : false,
        highScore: activeButtonIndex === 1 ? true : false,
        lowScore: activeButtonIndex === 3 ? true : false,
        isImage: activeButtonIndex === 2 ? true : false,
        page: page + 1,
        limit: 10,
      };

      getSortedReviewsComments(payload)
        .unwrap()
        .then((response): void => {
          if (response.status === "success") {
            dispatch(setPage(Number(response.data.page)));
            dispatch(setReviews(response.data.feedback));
          }
        })
        .catch((err: any) => {
          DevelopmentDebug({ err });
        });
    } else {
      getReviewsComments({ item_id: id ?? 0, page: page + 1 })
        .unwrap()
        .then((response): void => {
          console.log(response.data.feedback);

          if (response.status === "success") {
            dispatch(setPage(Number(response.data.page)));
            dispatch(setReviews(response.data.feedback));
          }
        })
        .catch((err: any) => {
          DevelopmentDebug({ err });
        });
    }
  };

  return (
    <Layout
      header={<Header title="Отзывы" leftIcon navigationHandle={goBack} />}
    >
      <ReviewsStarsInfo
        reviewsStatistics={reviewsStatistics}
        reviewsCount={reviewsCount}
      />
      {reviewsStatistics.images.length > 0 && (
        <ReviewsPhotoSlider images={reviewsStatistics.images} />
      )}
      <ReviewsSortedButtons
        newOld={newOld}
        activeButtonIndex={activeButtonIndex}
        handleButtOnPress={handleButtOnPress}
        arrowsButtonHandle={newOldReviewsHandle}
      />
      <View style={{ marginTop: 60, rowGap: 30, flex: 1 }}>
        {isLoading ? (
          [...Array(4)].map((_, i) => <ReviewsCommentCardSceleton key={i} />)
        ) : (
          <>
            {reviews.map((review) => (
              <ReviewsCommentCard key={review.id} review={review} />
            ))}
          </>
        )}

        {(loading || sortedLoading || isFetching) &&
          [...Array(4)].map((_, i) => <ReviewsCommentCardSceleton key={i} />)}
      </View>
      {allReviewsCount !== reviews.length && (
        <View
          style={{
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={moreReviewsCommentsHandle}
            style={{
              borderColor: "#272728",
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "300",
                color: "#272728",
              }}
            >
              Загрузить ещё
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Layout>
  );
};

export default ProductReviews;
