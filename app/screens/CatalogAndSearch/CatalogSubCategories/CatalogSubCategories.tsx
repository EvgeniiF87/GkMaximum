import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import Layout from "../../../src/components/layout/Layout";
import Header from "../../../src/components/header/Header";
import {
  ICategory,
  IRequestSelectedCategory,
} from "../../../entities/Category/types/category-types";
import { View } from "react-native";
import BlockArrowRight from "../../../src/components/block-arrow-right/BlockArrowRight";
import { CatalogAndSearchStackParamList } from "../../../navigation/catalog-and-search/catalog-and-search-navigation";
import { useAppSpiner } from "../../../src/hooks/AppSpiner";
import { useAppDispatch, useAppSelector } from "../../../src/hooks/redux";
import { DevelopmentDebug } from "../../../src/helpers/development-debug";
import { useLazyGetProductsByCategoryQuery } from "../../../api/CategoriesApi/CategoriesApi";
import {
  setCatalogProduct,
  setPage,
  setSelectedCategory,
} from "../../../store/reducers/CatalogProductSlice";
import {
  setCategory,
  setCategoryID,
} from "../../../store/reducers/FilterSlice";

type CatalogSubCategoriesProps = {
  route: RouteProp<CatalogAndSearchStackParamList, "CatalogSubCategories">;
};

const CatalogSubCategories: FC<CatalogSubCategoriesProps> = ({ route }) => {
  const { goBack, navigate } = useNavigation<AppPropsScreen>();
  const { categories, categoryTitle } = route.params;
  const { showSpiner, hideSpiner } = useAppSpiner();
  const { name: region } = useAppSelector((state) => state.RegionReducer);
  const [getProductsByCategory] = useLazyGetProductsByCategoryQuery();
  const dispatch = useAppDispatch();

  const selectCategoryOrNextCategoryScreen = (
    category: ICategory | undefined
  ) => {
    if (category && category.category.length > 0) {
      navigate("Main", {
        screen: "Tabs",
        params: {
          screen: "TabCatalogAndSearch",
          params: {
            screen: "CatalogSubSubCategories",
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
    <Layout
      header={
        <Header title={categoryTitle} leftIcon navigationHandle={goBack} />
      }
    >
      <View>
        {categories?.map((cat) => (
          <BlockArrowRight
            key={cat?.id}
            titleFontSize={16}
            title={cat?.title || ""}
            isArrow
            isShowArrow={
              cat?.category && cat.category.length > 0 ? true : false
            }
            navigationHandle={() => selectCategoryOrNextCategoryScreen(cat)}
          />
        ))}
      </View>
    </Layout>
  );
};

export default CatalogSubCategories;
