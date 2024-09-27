import { Text, View, TouchableOpacity, Platform, Image } from "react-native";
import Layout from "../../src/components/layout/Layout";
import { useAppDispatch, useAppSelector } from "../../src/hooks/redux";
import Header from "../../src/components/header/Header";
import { devApiImgUrl } from "../../api/config/config";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../navigation/routes/app-navigation";
import {
  ICategory,
  IRequestSelectedCategory,
} from "../../entities/Category/types/category-types";
import { useLazyGetProductsByCategoryQuery } from "../../api/CategoriesApi/CategoriesApi";
import { useAppSpiner } from "../../src/hooks/AppSpiner";
import { DevelopmentDebug } from "../../src/helpers/development-debug";
import {
  setCatalogProduct,
  setPage,
  setSelectedCategory,
} from "../../store/reducers/CatalogProductSlice";
import { setCategory, setCategoryID } from "../../store/reducers/FilterSlice";

const Catalog = () => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const { showSpiner, hideSpiner } = useAppSpiner();
  const { name: region } = useAppSelector((state) => state.RegionReducer);
  const { categories } = useAppSelector((state) => state.CategoryReducer);
  const dispatch = useAppDispatch();
  const [getProductsByCategory] = useLazyGetProductsByCategoryQuery();

  const selectCategoryOrNextCategoryScreen = (
    category: ICategory | undefined
  ) => {
    if (category && category.category.length > 0) {
      navigate("Main", {
        screen: "Tabs",
        params: {
          screen: "TabCatalogAndSearch",
          params: {
            screen: "CatalogSubCategories",
            params: {
              categories: category.category,
              categoryTitle: category.title,
            },
          },
        },
      });
    } else {
      showSpiner("Идёт обработка. Подождите...");
      dispatch(setCategory(category ? category.title : ""));
      dispatch(setCategoryID(category ? category.id : 0));
      const payload: IRequestSelectedCategory = {
        id: category ? category?.id : 0,
        region,
      };

      getProductsByCategory(payload)
        .unwrap()
        .then((response): void => {
          DevelopmentDebug(response.data.items);
          if (response.status === "success") {
            dispatch(setSelectedCategory(category?.id));
            dispatch(setPage(Number(response.data.page)));
            dispatch(setCatalogProduct(response.data.items));
            hideSpiner();
            navigate("Main", {
              screen: "Tabs",
              params: {
                screen: "TabCatalogAndSearch",
                params: {
                  screen: "CatalogProducts",
                  params: {
                    categoryTitle: category?.title,
                  },
                },
              },
            });
          }
        });
    }
  };

  return (
    <Layout header={<Header title="Каталог" />}>
      <View style={{ paddingHorizontal: 20, marginTop: 20, rowGap: 20 }}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category?.id}
            onPress={() => selectCategoryOrNextCategoryScreen(category)}
            style={[
              {
                flexDirection: "row",
                padding: 10,
                borderRadius: 16,
                backgroundColor: "#fff",
              },
              Platform.select({
                ios: {
                  shadowColor: "#212121",
                  shadowOpacity: 0.2,
                  shadowOffset: { width: 0, height: 1 },
                  shadowRadius: 3,
                },
                android: {
                  elevation: 4,
                },
              }),
            ]}
          >
            <Image
              source={{ uri: `${devApiImgUrl}/${category?.img}` }}
              style={{ width: "50%", height: 83, resizeMode: "cover" }}
            />
            <Text
              style={{
                color: category?.title === "Крема" ? "#DE002B" : "#272728",
                fontSize: 20,
                fontWeight: "400",
                lineHeight: 23.4,
                marginLeft: 20,
              }}
            >
              {category?.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Layout>
  );
};

export default Catalog;
