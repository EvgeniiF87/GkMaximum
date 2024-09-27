import { View } from "react-native";
import Layout from "../../../../src/components/layout/Layout";
import Header from "../../../../src/components/header/Header";
import { useNavigation } from "@react-navigation/native";
import BlockBottomButtons from "../../../../src/components/BlockBottomButtons/BlockBottomButtons";
import BlockRadioButtons from "../../../../src/components/block-radio-buttons/BlockRadioButtons";
import {
  ISorted,
  SortedNameType,
  SortedSlugType,
} from "../../../../store/reducers/FilterSlice";
import { useAppDispatch, useAppSelector } from "../../../../src/hooks/redux";
import { setSorted } from "../../../../store/reducers/FilterSlice";
import { useState } from "react";

const sortedList: ISorted[] = [
  { label: "Без сортировки", value: 0 },
  { label: "По популярности", value: 1 },
  { label: "По возрастанию цены", value: 2 },
  { label: "По убыванию цены", value: 3 },
  { label: "По велечине скидки", value: 4 },
];

const Sorted = () => {
  const { goBack } = useNavigation();
  const { sorted } = useAppSelector((state) => state.FilterReducer);
  const dispatch = useAppDispatch();
  const [valueSelect, setValueSelect] =
    useState<{ label: string | undefined; value: string | number | boolean }>(
      sorted
    );

  const goBackHandle = () => {
    goBack();
    if (sorted.value === valueSelect.value) {
      return;
    } else {
      dispatch(setSorted({ label: "По популярности", value: 1 }));
    }
  };

  const applyHandle = () => {
    goBack();
    dispatch(
      setSorted({
        label: valueSelect?.label as SortedNameType,
        value: valueSelect?.value as SortedSlugType,
      })
    );
  };

  const selectedHandler = (
    value: string | number | boolean,
    label?: string
  ) => {
    setValueSelect({ label: label, value: value });
  };

  return (
    <Layout
      noMenu
      isBottomButton
      header={
        <Header title="Сортировать" leftIcon navigationHandle={goBackHandle} />
      }
      bottomButton={
        <BlockBottomButtons
          borderTop
          isFilterScreen
          onPressApplayButtonHandle={applyHandle}
          titleApplayButton="Применить"
        />
      }
    >
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <BlockRadioButtons
          list={sortedList}
          selected={valueSelect.value}
          variant={"vertical"}
          rowGap={20}
          _styles={{ marginTop: 20 }}
          onSelect={selectedHandler}
        />
      </View>
    </Layout>
  );
};

export default Sorted;
