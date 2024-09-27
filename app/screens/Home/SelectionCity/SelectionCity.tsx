import { FC, useState, useEffect } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Layout from "../../../src/components/layout/Layout";
import Header from "../../../src/components/header/Header";
import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  setFirstStartApp,
  setIsLoading,
} from "../../../store/reducers/AppSlice";
import { useAppDispatch, useAppSelector } from "../../../src/hooks/redux";
import Search from "../../../src/components/search/Search";
import { setCityName, setCityID } from "../../../store/reducers/RegionSlice";
import {
  setNews,
  setHits,
  setSales,
  setAllProducts,
  setAllProductsCount,
  setAllProductsReset,
  setPage,
} from "../../../store/reducers/SectionSlice";
import { resetPromotions } from "../../../store/reducers/PromotionsSlice";
import { setUserCity } from "../../../store/reducers/UserSlice";
import {
  useLazyGetMainScreenAllProductsQuery,
  useLazyGetMainScreenDataQuery,
} from "../../../api/MainScreen/MainScreenApi";
import { HomeStackParamList } from "../../../navigation/home/home-navigation";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import { IRegion } from "../../../entities/Region/types/region-type";
import { useLazyGetRegionBannersQuery } from "../../../api/BannersApi/BannersApi";
import {
  setBanners,
  setResetBanners,
} from "../../../store/reducers/BannersSlice";
// import { useAppPushNotification } from "../../../src/hooks/AppPsuhNotification";

type SelectionCityProps = {
  route: RouteProp<HomeStackParamList, "SelectionCity">;
};

const SelectionCity: FC<SelectionCityProps> = ({ route }) => {
  const { type } = route?.params;
  const { navigate, replace } = useNavigation<AppPropsScreen>();
  const dispatch = useAppDispatch();
  // const { showOnbording } = useAppSelector((state) => state.OnbordingReducer);
  // const { appPushNotification } = useAppPushNotification();
  const { regions } = useAppSelector((state) => state.AllRegionsReducer);
  const { firstStartApp } = useAppSelector((state) => state.AppReducer);
  const { name: region } = useAppSelector((state) => state.RegionReducer);
  const [getSectionsData] = useLazyGetMainScreenDataQuery();
  const [getAllProducts] = useLazyGetMainScreenAllProductsQuery();
  const [getRegionBanners] = useLazyGetRegionBannersQuery();
  const [value, setValue] = useState<string | undefined>();
  const [regionsList, setRegionsList] = useState<IRegion[]>(regions);

  const goBackHandle = () => {
    dispatch(setIsLoading(false));
    if (type === "profile") {
      replace("UserInfo");
    } else if (firstStartApp) {
      const section = getSectionsData("Воронеж")
        .unwrap()
        .then((sectionData) => {
          if (sectionData.status === "success") {
            dispatch(setNews(sectionData?.data.byCreate));
            dispatch(setHits(sectionData?.data.byHit));
            dispatch(setSales(sectionData?.data.byDiscount));
            return true;
          }
        })
        .catch((err) => console.log(err));

      const products = getAllProducts({ region: "Воронеж" })
        .unwrap()
        .then((allProductsData) => {
          if (allProductsData.status === "success") {
            dispatch(setAllProducts(allProductsData?.data.items));
            dispatch(setAllProductsCount(allProductsData.data.totalCount));
            return true;
          }
        })
        .catch((err) => console.log(err));

      Promise.all([regions, section, products]).then((response) => {
        if (response[0] && response[1] && response[2]) {
          dispatch(setCityName("Воронеж"));
          dispatch(setIsLoading(false));
          dispatch(setFirstStartApp(false));
          navigate("Main", {
            screen: "Tabs",
            params: { screen: "TabHome", params: { screen: "Home" } },
          });

          // if (showOnbording) appPushNotification();
        }
      });
    } else {
      navigate("Main", {
        screen: "Tabs",
        params: { screen: "TabHome", params: { screen: "Home" } },
      });
    }
  };

  const selectRegionHandle = (name: string, id: number) => {
    if (type === "profile") {
      dispatch(setUserCity(name));
      replace("UserInfo");
    } else if (firstStartApp) {
      const section = getSectionsData(name)
        .unwrap()
        .then((sectionData) => {
          if (sectionData.status === "success") {
            dispatch(setNews(sectionData?.data.byCreate));
            dispatch(setHits(sectionData?.data.byHit));
            dispatch(setSales(sectionData?.data.byDiscount));
            return true;
          }
        })
        .catch((err) => console.log(err));

      const products = getAllProducts({ region: name })
        .unwrap()
        .then((allProductsData) => {
          if (allProductsData.status === "success") {
            dispatch(setAllProducts(allProductsData?.data.items));
            dispatch(setAllProductsCount(allProductsData.data.totalCount));
            return true;
          }
        })
        .catch((err) => console.log(err));

      const regionBanners = getRegionBanners({ id })
        .unwrap()
        .then((response) => {
          if (response.status === "success") {
            dispatch(setResetBanners());
            dispatch(setBanners({ banners: response.data }));
            return true;
          }
        });

      Promise.all([regionBanners, section, products]).then((response) => {
        if (response[0] && response[1] && response[2]) {
          dispatch(setCityName(name));
          dispatch(setCityID(id));
          dispatch(setIsLoading(false));
          dispatch(setFirstStartApp(false));
          navigate("Main", {
            screen: "Tabs",
            params: { screen: "TabHome", params: { screen: "Home" } },
          });

          // if (showOnbording) appPushNotification();
        }
      });
    } else {
      if (name === region) {
        navigate("Main", {
          screen: "Tabs",
          params: { screen: "TabHome", params: { screen: "Home" } },
        });
      } else {
        dispatch(setIsLoading(true));
        dispatch(setNews([]));
        dispatch(setHits([]));
        dispatch(setSales([]));
        dispatch(setAllProductsReset());
        dispatch(setAllProductsCount(0));
        dispatch(setPage(1));
        dispatch(resetPromotions());
        const section = getSectionsData(name)
          .unwrap()
          .then((sectionData) => {
            if (sectionData.status === "success") {
              dispatch(setNews(sectionData?.data.byCreate));
              dispatch(setHits(sectionData?.data.byHit));
              dispatch(setSales(sectionData?.data.byDiscount));
              return true;
            }
          })
          .catch((err) => console.log(err));

        const products = getAllProducts({ region: name })
          .unwrap()
          .then((allProductsData) => {
            if (allProductsData.status === "success") {
              dispatch(setAllProducts(allProductsData?.data.items));
              dispatch(setAllProductsCount(allProductsData.data.totalCount));
              return true;
            }
          })
          .catch((err) => console.log(err));

        const regionBanners = getRegionBanners({ id })
          .unwrap()
          .then((response) => {
            if (response.status === "success") {
              dispatch(setResetBanners());
              dispatch(setBanners({ banners: response.data }));
              return true;
            }
          });

        Promise.all([section, products, regionBanners]).then((response) => {
          if (response[0] && response[1] && response[2]) {
            dispatch(setIsLoading(false));
            dispatch(setCityName(name));
            dispatch(setCityID(id));
            navigate("Main", {
              screen: "Tabs",
              params: { screen: "TabHome", params: { screen: "Home" } },
            });
          }
        });
      }
    }
  };

  const searchCityNameHandle = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    setRegionsList(
      regions.filter((region) =>
        region.name.toLowerCase().includes(value?.toLowerCase() || "")
      )
    );
  }, [value]);

  return (
    <Layout
      header={
        <Header title="Ваш город" crossIconHandle={goBackHandle} crossIcon />
      }
      search={
        <Search
          placeholder="Найти город"
          value={value}
          onChangeHandle={searchCityNameHandle}
          mt
        />
      }
    >
      <View style={{ marginTop: 10 }}>
        {regionsList.map(({ id, name }) => (
          <TouchableOpacity
            key={name}
            style={{ paddingHorizontal: 20, paddingVertical: 10 }}
            onPress={() => selectRegionHandle(name, id)}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#272728",
              }}
            >
              {name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Layout>
  );
};

export default SelectionCity;
