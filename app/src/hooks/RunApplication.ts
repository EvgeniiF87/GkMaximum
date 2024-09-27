import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useLazyGetRegionBannersQuery } from "../../api/BannersApi/BannersApi";
import { useLazyGetCategoriesQuery } from "../../api/CategoriesApi/CategoriesApi";
import { useLazyGetAllConfigurationKeysQuery } from "../../api/ConfigurationKeysApi/ConfigurationKeysApi";
import {
  useLazyGetMainScreenDataQuery,
  useLazyGetMainScreenAllProductsQuery,
} from "../../api/MainScreen/MainScreenApi";
import {
  useGetRegionsMutation,
  useGetRegionNameGeolocationMutation,
  useLazyGetRegionQuery,
} from "../../api/Region/RegionApi";
import { IRegionNameGeolocationPayload } from "../../entities/Region/types/region-type";
import { AppPropsScreen } from "../../navigation/routes/app-navigation";
import { setRegions } from "../../store/reducers/AllRegionsSlice";
import { setIsLoading, setFirstStartApp } from "../../store/reducers/AppSlice";
import { setBanners } from "../../store/reducers/BannersSlice";
import {
  setIsGranted,
  setLatitude,
  setLongitude,
} from "../../store/reducers/GeolocationSlice";
import { setCityName, setCityID } from "../../store/reducers/RegionSlice";
import {
  setNews,
  setHits,
  setSales,
  setAllProducts,
  setAllProductsCount,
} from "../../store/reducers/SectionSlice";
import { DevelopmentDebug } from "../helpers/development-debug";
import { useAppSelector, useAppDispatch } from "./redux";
import { setCategories } from "../../store/reducers/CategorySlice";
import { setConfigurationKeys } from "../../store/reducers/ConfigurationKeysAndDocumentsSlice";
import { setHideOnbording } from "../../store/reducers/OnbordingSlice";
// import { useAppPushNotification } from "./AppPsuhNotification";

export const useRunApplication = () => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const { isAuth, user } = useAppSelector((state) => state.userReducer);
  const { showOnbording } = useAppSelector((state) => state.OnbordingReducer);
  const { name: region } = useAppSelector((state) => state.RegionReducer);
  const dispatch = useAppDispatch();
  // const { appPushNotification } = useAppPushNotification();
  const [getAllRegions] = useGetRegionsMutation();
  const [getCategories] = useLazyGetCategoriesQuery();
  const [getSectionsData] = useLazyGetMainScreenDataQuery();
  const [getAllProducts] = useLazyGetMainScreenAllProductsQuery();
  const [getAllConfigurationKeys] = useLazyGetAllConfigurationKeysQuery();
  const [getRegionNameGeolocation] = useGetRegionNameGeolocationMutation();
  const [getRegion] = useLazyGetRegionQuery();
  const [getRegionBanners] = useLazyGetRegionBannersQuery();

  const locationPermission = async () => {
    if (showOnbording) {
      navigate("Main", {
        screen: "Tabs",
        params: {
          screen: "TabHome",
          params: { screen: "Home" },
        },
      });
    }
    dispatch(setHideOnbording());
    const permission = await Location.requestForegroundPermissionsAsync();
    if (permission.status === Location.PermissionStatus.GRANTED) {
      dispatch(setIsGranted(true));
      try {
        const positionDevice = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        dispatch(setLatitude(positionDevice.coords.latitude));
        dispatch(setLongitude(positionDevice.coords.longitude));

        const payload: IRegionNameGeolocationPayload = {
          coords: {
            lat: String(positionDevice.coords.latitude),
            lon: String(positionDevice.coords.longitude),
          },
        };

        getAllRegions({})
          .unwrap()
          .then((data) => {
            if (data.status === "success") {
              dispatch(setRegions(data?.data.regions));
            }
          })
          .catch((err) => console.log(err));

        getRegionNameGeolocation(payload)
          .unwrap()
          .then((response): void => {
            console.log(response);

            if (response.status === "success") {
              const section = getSectionsData(response.data.slug)
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

              const products = getAllProducts({
                region: String(response.data.slug),
              })
                .unwrap()
                .then((allProductsData) => {
                  if (allProductsData.status === "success") {
                    dispatch(setAllProducts(allProductsData?.data.items));
                    dispatch(
                      setAllProductsCount(allProductsData.data.totalCount)
                    );
                    return true;
                  }
                })
                .catch((err) => console.log(err));

              Promise.all([section, products]).then((responseProm) => {
                if (responseProm[0] && responseProm[1]) {
                  getRegion({ name: response.data.slug })
                    .unwrap()
                    .then((regionResponse) => {
                      if (regionResponse.status === "success") {
                        dispatch(setCityName(regionResponse.data.name));
                        dispatch(setCityID(regionResponse.data.id));

                        getRegionBanners({ id: regionResponse.data.id })
                          .unwrap()
                          .then((response) => {
                            if (response.status === "success") {
                              dispatch(setBanners({ banners: response.data }));
                            }
                          });
                      }
                    });

                  dispatch(setIsLoading(false));
                  dispatch(setFirstStartApp(false));
                }
              });

              // if (showOnbording) appPushNotification();
            }
          })
          .catch((err) => {
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
                  dispatch(
                    setAllProductsCount(allProductsData.data.totalCount)
                  );
                  dispatch(setCityName("Воронеж"));
                  return true;
                }
              })
              .catch((err) => console.log(err));

            Promise.all([section, products]).then((response) => {
              if (response[0] && response[1]) {
                getRegion({ name: "Воронеж" })
                  .unwrap()
                  .then((regionResponse) => {
                    if (regionResponse.status === "success") {
                      dispatch(setCityName(regionResponse.data.name));
                      dispatch(setCityID(regionResponse.data.id));

                      getRegionBanners({ id: regionResponse.data.id })
                        .unwrap()
                        .then((response) => {
                          if (response.status === "success") {
                            dispatch(setBanners({ banners: response.data }));
                          }
                        });
                    }
                  });

                dispatch(setIsLoading(false));
                dispatch(setFirstStartApp(false));
              }
            });

            // if (showOnbording) appPushNotification();
          });
      } catch (err) {
        DevelopmentDebug(err);
      }
    } else {
      getAllRegions({})
        .unwrap()
        .then((data) => {
          if (data.status === "success") {
            dispatch(setRegions(data?.data.regions));
            navigate("Main", {
              screen: "Tabs",
              params: {
                screen: "TabHome",
                params: { screen: "SelectionCity", params: { type: "start" } },
              },
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const authEntryApp = () => {
    const regions = getAllRegions({})
      .unwrap()
      .then((data) => {
        if (data.status === "success") {
          dispatch(setRegions(data?.data.regions));
          return true;
        }
      })
      .catch((err) => console.log(err));

    const section = getSectionsData(user.city ? user.city : region)
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

    const products = getAllProducts({ region: user.city ? user.city : region })
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
        dispatch(setIsLoading(false));
        dispatch(setFirstStartApp(false));

        getRegion({ name: user.city ? user.city : region })
          .unwrap()
          .then((regionResponse) => {
            if (regionResponse.status === "success") {
              dispatch(setCityName(regionResponse.data.name));
              dispatch(setCityID(regionResponse.data.id));

              getRegionBanners({ id: regionResponse.data.id })
                .unwrap()
                .then((response) => {
                  if (response.status === "success") {
                    dispatch(setBanners({ banners: response.data }));
                  }
                });
            }
          });

        navigate("Main", {
          screen: "Tabs",
          params: {
            screen: "TabHome",
            params: { screen: "Home" },
          },
        });
      }
    });
  };

  const checkEnableGeolocation = async () => {
    const check = await Location.hasServicesEnabledAsync();

    if (check) locationPermission();

    if (!check) {
      getAllRegions({})
        .unwrap()
        .then((data) => {
          if (data.status === "success") {
            dispatch(setRegions(data?.data.regions));
            navigate("Main", {
              screen: "Tabs",
              params: {
                screen: "TabHome",
                params: { screen: "SelectionCity", params: { type: "start" } },
              },
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const runApplication = () => {
    getCategories({}).then((response) => {
      if (response.data?.status === "success" && response.data.data.length) {
        dispatch(setCategories(response.data.data));
      }
    });

    getAllConfigurationKeys({}).then((response) => {
      if (response.data?.status === "success") {
        dispatch(setConfigurationKeys(response.data.data.configurationKeys));
      }
    });

    if (isAuth) {
      authEntryApp();
    } else {
      checkEnableGeolocation();
    }
  };

  return { runApplication };
};
