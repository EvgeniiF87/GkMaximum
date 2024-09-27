import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Catalog from "../../screens/CatalogAndSearch/Catalog";
import CatalogProducts from "../../screens/CatalogAndSearch/catalog-products/CatalogProducts";
import { ICategory } from "../../entities/Category/types/category-types";
import CatalogSubCategories from "../../screens/CatalogAndSearch/CatalogSubCategories/CatalogSubCategories";
import CatalogSubSubCategories from "../../screens/CatalogAndSearch/CatalogSubSubCategories/CatalogSubSubCategories";
import CatalogProductFullInfo from "../../screens/CatalogAndSearch/catalog-product-full-info/CatalogProductFullInfo";
import CatalogProductReviews from "../../screens/CatalogAndSearch/CatalogProductReviews/CatalogProductReviews";

export type CatalogAndSearchStackParamList = {
  Catalog: undefined;
  CatalogProducts: {
    categoryTitle?: string;
    searchQuery?: string;
  };
  CatalogSubCategories: { categories: ICategory[]; categoryTitle: string };
  CatalogSubSubCategories: { categories: ICategory[]; categoryTitle: string };
  CatalogProductFullInfo: {
    id: number;
    whatComeScreen?: "search";
    searchQuery?: string;
  };
  CatalogProductReviews: { id: number | undefined };
};

const CatalogAndSearchNav =
  createNativeStackNavigator<CatalogAndSearchStackParamList>();

export const CatalogAndSearchNavigation = () => {
  return (
    <CatalogAndSearchNav.Navigator
      initialRouteName="Catalog"
      screenOptions={{ headerShown: false }}
    >
      <CatalogAndSearchNav.Screen name="Catalog" component={Catalog} />
      <CatalogAndSearchNav.Screen
        name="CatalogProducts"
        component={CatalogProducts}
      />

      <CatalogAndSearchNav.Screen
        name="CatalogSubCategories"
        component={CatalogSubCategories}
      />

      <CatalogAndSearchNav.Screen
        name="CatalogSubSubCategories"
        component={CatalogSubSubCategories}
      />
      <CatalogAndSearchNav.Screen
        name="CatalogProductFullInfo"
        component={CatalogProductFullInfo}
      />
      <CatalogAndSearchNav.Screen
        name="CatalogProductReviews"
        component={CatalogProductReviews}
      />
    </CatalogAndSearchNav.Navigator>
  );
};
