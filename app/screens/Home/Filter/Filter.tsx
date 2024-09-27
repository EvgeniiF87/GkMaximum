import { View, Text } from "react-native";
import Header from "../../../src/components/header/Header";
import { useNavigation } from "@react-navigation/native";
import InputRange from "../../../src/components/input/inputRange";
import BlockArrowRight from "../../../src/components/block-arrow-right/BlockArrowRight";
import BlockSwitch from "../../../src/components/block-switch/BlockSwitch";
import BlockBottomButtons from "../../../src/components/BlockBottomButtons/BlockBottomButtons";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import { useGetAllFiltersQuery } from "../../../api/FilterApi/FilterApi";
import Layout from "../../../src/components/layout/Layout";
import { useAppDispatch, useAppSelector } from "../../../src/hooks/redux";
import {
  setMinPrice,
  setMaxPrice,
  setFilterGoBackScreen,
} from "../../../store/reducers/FilterSlice";
import { resetFilteredProduct } from "../../../store/reducers/FilteredProductSlice";
import { useAllFiltersCount } from "../../../src/hooks/AllFiltersCount";

const Filter = () => {
  const { goBack, navigate } = useNavigation<AppPropsScreen>();
  const { data } = useGetAllFiltersQuery({});
  const { allFiltersCount } = useAllFiltersCount();
  const { sorted, offers, brands, appointment, category } = useAppSelector(
    (state) => state.FilterReducer
  );
  const dispatch = useAppDispatch();

  const onChangeValueHandle = (min: number, max: number) => {
    dispatch(setMinPrice(min));
    dispatch(setMaxPrice(max));
  };

  const nextSortedScreen = () => {
    navigate("Sorted");
  };

  const nextOffersScreen = () => {
    navigate("Offers");
  };

  const nextBrandsScreen = () => {
    navigate("Brands", { brandsList: data?.data.brands || [] });
  };

  const nextAppointmentScreen = () => {
    navigate("Appointment", {
      appointmentList: data?.data.purpose || [],
    });
  };

  const nextCategoriesScreen = () => {
    navigate("FilterCategories");
  };

  const resultFilterHandle = () => {
    allFiltersCount();
    dispatch(setFilterGoBackScreen(true));
    dispatch(resetFilteredProduct());
    goBack();
  };

  return (
    <Layout
      noMenu
      isBottomButton
      header={<Header title="Фильтр" leftIcon navigationHandle={goBack} />}
      bottomButton={
        <BlockBottomButtons
          isFilterScreen
          titleApplayButton="Применить"
          onPressApplayButtonHandle={resultFilterHandle}
        />
      }
    >
      <BlockArrowRight
        title="Сортировать"
        marginVertical={15}
        isFilter
        filterTitle={sorted.label}
        navigationHandle={nextSortedScreen}
      />

      <BlockArrowRight
        title="Категория"
        marginVertical={20}
        isFilter
        filterTitle={category}
        navigationHandle={nextCategoriesScreen}
      />

      <BlockArrowRight
        title="Наши предложения"
        marginVertical={15}
        isFilter
        filterTitle={offers.label}
        navigationHandle={nextOffersScreen}
      />

      <View style={{ paddingHorizontal: 20, marginBottom: 20, marginTop: 20 }}>
        <Text
          style={{
            fontSize: 20,
            color: "#272728",
            fontWeight: "600",
            marginBottom: 20,
          }}
        >
          Цена:
        </Text>
        <InputRange
          min={96}
          max={9999}
          step={10}
          onChangeValue={onChangeValueHandle}
        />
      </View>

      <BlockArrowRight
        title="По брендам"
        marginVertical={20}
        isFilter
        filterCount={brands}
        navigationHandle={nextBrandsScreen}
      />

      <BlockArrowRight
        title="Назначение"
        marginVertical={20}
        isFilter
        filterCount={appointment}
        navigationHandle={nextAppointmentScreen}
      />

      <BlockSwitch
        title="Только со скидкой"
        marginVertical={10}
        paddingHorizontal={15}
      />
    </Layout>
  );
};

export default Filter;
