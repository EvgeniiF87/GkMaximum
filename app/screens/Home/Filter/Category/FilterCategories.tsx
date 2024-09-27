import Layout from "../../../../src/components/layout/Layout";
import Header from "../../../../src/components/header/Header";
import BlockBottomButtons from "../../../../src/components/BlockBottomButtons/BlockBottomButtons";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../../src/hooks/redux";
import BlockArrowRight from "../../../../src/components/block-arrow-right/BlockArrowRight";
import { ICategory } from "../../../../entities/Category/types/category-types";
import {
  setCategory,
  setCategoryID,
  setResetCategory,
} from "../../../../store/reducers/FilterSlice";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";

const FilterCategories = () => {
  const { goBack, navigate } = useNavigation<AppPropsScreen>();
  const { categories } = useAppSelector((state) => state.CategoryReducer);
  const dispatch = useAppDispatch();

  const selectCategoryOrNextCategoryScreen = (
    category: ICategory | undefined
  ) => {
    if (category && category.category.length > 0) {
      navigate("FilterSubCategories", {
        categories: category.category,
        categoryTitle: category.title,
      });
    } else {
      dispatch(setCategory(category ? category.title : ""));
      dispatch(setCategoryID(category ? category.id : 0));
      goBack();
    }
  };

  const resetCategoryHandler = () => {
    dispatch(setResetCategory());
  };

  return (
    <Layout
      noMenu
      isBottomButton
      header={<Header title="Категория" leftIcon navigationHandle={goBack} />}
      bottomButton={
        <BlockBottomButtons
          borderTop
          isCategoryReset
          onPressResetButtonHandle={resetCategoryHandler}
        />
      }
    >
      <View style={{ marginTop: 20 }}>
        {categories.map((cat) => (
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

export default FilterCategories;
