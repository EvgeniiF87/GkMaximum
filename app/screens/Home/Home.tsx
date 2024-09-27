import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import Layout from "../../src/components/layout/Layout";
import Section from "../../src/components/section/Section";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../navigation/routes/app-navigation";
import BlockSelectedCityAndSearch from "../../src/components/block-selected-city-and-search/BlockSelectedCityAndSearch";
import SectionAllProducts from "../../src/components/section-all-products/SectionAllProducts";
import Slider from "../../src/components/slider/Slider";
import Banner2 from "../../assets/fake/advertising/baner2.jpg";
import Advertising from "../../assets/fake/advertising/baner1.jpg";
import { useAppDispatch, useAppSelector } from "../../src/hooks/redux";
import { useLazyGetAllPromotionsQuery } from "../../api/PromotionsApi/PromotionsApi";
import {
  setAllPromotionsCount,
  setPromotions,
} from "../../store/reducers/PromotionsSlice";
import { setNews, setAllNewsCount } from "../../store/reducers/NewsSlice";
import { setHits, setAllHitsCount } from "../../store/reducers/HitSlice";
import { DevelopmentDebug } from "../../src/helpers/development-debug";
import useAppAlertNotification from "../../src/hooks/AppAlertNotification";
import { useLazyGetAllNewsQuery } from "../../api/NewsApi/NewsApi";
import { useLazyGetAllHitsQuery } from "../../api/HitsApi/HitsApi";
import { useEffect } from "react";
import { useAllFiltersCount } from "../../src/hooks/AllFiltersCount";
import HomeSceleton from "../../src/components/home-sceleton/HomeSceleton";
import { devApiImgUrl } from "../../api/config/config";

const advertisings = [Advertising, Advertising, Advertising, Advertising];

const Home = () => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const { alertNotification } = useAppAlertNotification();
  const { allFiltersCount } = useAllFiltersCount();
  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.RegionReducer);
  const { isLoading } = useAppSelector((state) => state.AppReducer);
  const { topBanners, centerBanners } = useAppSelector(
    (state) => state.BannersReducer
  );
  const { news, hits, sales, allProducts } = useAppSelector(
    (state) => state.SectionReducer
  );
  const { promotions } = useAppSelector((state) => state.PromotionsReducer);
  const { news: newsScreen } = useAppSelector((state) => state.NewsReducer);
  const { hits: hitsScreen } = useAppSelector((state) => state.HitsReducer);

  const [getAllPromotions] = useLazyGetAllPromotionsQuery();
  const [getAllNews] = useLazyGetAllNewsQuery();
  const [getAllHits] = useLazyGetAllHitsQuery();

  const nextPromotionsScreenHandle = () => {
    if (promotions.length) {
      navigate("Main", {
        screen: "Tabs",
        params: { screen: "TabHome", params: { screen: "Promotions" } },
      });
    } else {
      getAllPromotions({ region: name })
        .unwrap()
        .then((AllPromotions) => {
          if (AllPromotions.status === "success") {
            dispatch(setPromotions(AllPromotions?.data.byDiscount));
            dispatch(setAllPromotionsCount(AllPromotions?.data.totalCount));
            navigate("Main", {
              screen: "Tabs",
              params: { screen: "TabHome", params: { screen: "Promotions" } },
            });
          }
        })
        .catch((err: any) => {
          DevelopmentDebug({ "Получение акционных товров на главной": err });
          alertNotification({
            message: "Ошибка получения акционных товров!",
            type: "error",
          });
        });
    }
  };

  const nextNewsScreenHandle = () => {
    if (newsScreen.length) {
      navigate("Main", {
        screen: "Tabs",
        params: { screen: "TabHome", params: { screen: "News" } },
      });
    } else {
      getAllNews({ region: name })
        .unwrap()
        .then((AllNews) => {
          if (AllNews.status === "success") {
            dispatch(setNews(AllNews?.data.byCreate));
            dispatch(setAllNewsCount(AllNews?.data.totalCount));
            navigate("Main", {
              screen: "Tabs",
              params: { screen: "TabHome", params: { screen: "News" } },
            });
          }
        })
        .catch((err: any) => {
          DevelopmentDebug({ "Получение новинок на главной": err });
          alertNotification({
            message: "Ошибка получения новинок!",
            type: "error",
          });
        });
    }
  };

  const nextHitsScreenHandle = () => {
    if (hitsScreen.length) {
      navigate("Main", {
        screen: "Tabs",
        params: { screen: "TabHome", params: { screen: "Hits" } },
      });
    } else {
      getAllHits({ region: name })
        .unwrap()
        .then((AllHits) => {
          if (AllHits.status === "success") {
            dispatch(setHits(AllHits?.data.byHit));
            dispatch(setAllHitsCount(AllHits?.data.totalCount));
            navigate("Main", {
              screen: "Tabs",
              params: { screen: "TabHome", params: { screen: "Hits" } },
            });
          }
        })
        .catch((err: any) => {
          DevelopmentDebug({ "Получение хитов на главной": err });
          alertNotification({
            message: "Ошибка получения хитов!",
            type: "error",
          });
        });
    }
  };

  useEffect(() => {
    allFiltersCount();
  }, []);

  const isNews = news.length ? true : false;
  const isHits = hits.length ? true : false;
  const isSales = sales.length ? true : false;
  const isAllProducts = allProducts.length ? true : false;
  const isTopBanners = topBanners.length ? true : false;
  const isCenterBanners = centerBanners.length ? true : false;

  return (
    <Layout>
      {isLoading ? (
        <HomeSceleton />
      ) : (
        <>
          <BlockSelectedCityAndSearch />

          <Slider
            type={"advertising"}
            typeSource={isTopBanners ? "network" : "local"}
            images={isTopBanners ? topBanners : advertisings}
            loop
            autoplay
            autoplayDelay={2000}
            autoplayInterval={5000}
          />

          {isNews && (
            <Section
              title="Новинки"
              whatComeScreen={"home"}
              link={nextNewsScreenHandle}
              topLine={true}
              products={news || []}
            />
          )}

          {isHits && (
            <Section
              title="Хиты"
              whatComeScreen={"home"}
              topLine={true}
              products={hits || []}
              link={nextHitsScreenHandle}
              _styles={{ marginTop: 10 }}
            />
          )}

          {isSales && (
            <Section
              title="Акции"
              whatComeScreen={"home"}
              titleColor={"#DE002B"}
              topLine={true}
              bottomLine={true}
              link={nextPromotionsScreenHandle}
              products={sales || []}
              _styles={{ marginTop: 10 }}
            />
          )}

          <View
            style={{
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {centerBanners.map((banner) => (
              <View key={banner.id}>
                {banner.url && banner.orientation === "center" && (
                  <TouchableOpacity onPress={() => Linking.openURL(banner.url)}>
                    <Image
                      source={
                        isCenterBanners
                          ? { uri: `${devApiImgUrl}/${banner.img}` }
                          : Banner2
                      }
                      style={{
                        width: Dimensions.get("window").width - 40,
                        height: (Dimensions.get("window").width / 100) * 60,
                        borderRadius: 16,
                        resizeMode: "cover",
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          {isAllProducts && (
            <SectionAllProducts
              topLine
              sceletoncCountElements={6}
              _styles={{ marginTop: 30 }}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default Home;
