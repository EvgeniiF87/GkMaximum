import React, { useState } from "react";
import Layout from "../../../../src/components/layout/Layout";
import Header from "../../../../src/components/header/Header";
import BlockBottomButtons from "../../../../src/components/BlockBottomButtons/BlockBottomButtons";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../src/hooks/redux";
import { setOffers } from "../../../../store/reducers/FilterSlice";
import BlockRadioButtons from "../../../../src/components/block-radio-buttons/BlockRadioButtons";

const offersList = [
  { label: "Без фильтров", value: 0 },
  { label: "Хит", value: 1 },
  { label: "Новинки", value: 2 },
  { label: "Акции", value: 3 },
];

const Offers = () => {
  const { goBack } = useNavigation();
  const { offers } = useAppSelector((state) => state.FilterReducer);
  const [values, setValues] =
    useState<{ value: string | number | boolean; label?: string }>(offers);
  const dispatch = useAppDispatch();

  const onSelectedHandle = (
    value: string | number | boolean,
    label?: string
  ) => {
    setValues({ label, value });
  };

  const applyHandle = () => {
    dispatch(
      setOffers({ label: values.label || "", value: Number(values.value) })
    );
    goBack();
  };

  return (
    <Layout
      noMenu
      isBottomButton
      header={
        <Header title="Наши предложения" leftIcon navigationHandle={goBack} />
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
          list={offersList}
          selected={values.value}
          variant={"vertical"}
          rowGap={20}
          onSelect={onSelectedHandle}
        />
      </View>
    </Layout>
  );
};

export default Offers;
