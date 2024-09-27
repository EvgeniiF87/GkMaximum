import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { useAppDispatch } from "../../../../../src/hooks/redux";
import { ICategory } from "../../../../../entities/Category/types/category-types";
import {
  setCategory,
  setCategoryID,
  setResetCategory,
} from "../../../../../store/reducers/FilterSlice";
import Layout from "../../../../../src/components/layout/Layout";
import Header from "../../../../../src/components/header/Header";
import BlockBottomButtons from "../../../../../src/components/BlockBottomButtons/BlockBottomButtons";
import { View } from "react-native";
import BlockArrowRight from "../../../../../src/components/block-arrow-right/BlockArrowRight";
import {
  AppPropsScreen,
  AppStackParamList,
} from "../../../../../navigation/routes/app-navigation";

type FilterSubCategoriesProps = {
  route: RouteProp<AppStackParamList, "FilterSubCategories">;
};

const FilterSubCategories: FC<FilterSubCategoriesProps> = ({ route }) => {
  const { goBack, navigate } = useNavigation<AppPropsScreen>();
  const { categories, categoryTitle } = route.params;
  const dispatch = useAppDispatch();

  const selectCategoryOrNextCategoryScreen = (
    category: ICategory | undefined
  ) => {
    if (category && category.category.length > 0) {
      navigate("FilterSubSubCategories", {
        categories: category.category,
        categoryTitle: category.title,
      });
    } else {
      dispatch(setCategory(category ? category.title : ""));
      dispatch(setCategoryID(category ? category.id : 0));
      navigate("Filter", { screen: "Main" });
    }
  };

  const resetCategoryHandler = () => {
    dispatch(setResetCategory());
  };

  return (
    <Layout
      noMenu
      isBottomButton
      header={
        <Header
          title={`Категория: ${categoryTitle}`}
          leftIcon
          navigationHandle={goBack}
        />
      }
      bottomButton={
        <BlockBottomButtons
          borderTop
          isCategoryReset
          onPressResetButtonHandle={resetCategoryHandler}
        />
      }
    >
      <View style={{ marginTop: 20 }}>
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

export default FilterSubCategories;
