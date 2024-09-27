import React, { FC, useState } from "react";
import Layout from "../../../../src/components/layout/Layout";
import Header from "../../../../src/components/header/Header";
import BlockBottomButtons from "../../../../src/components/BlockBottomButtons/BlockBottomButtons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import BlockCheckboxButtons from "../../../../src/components/block-checkbox-buttons/BlockCheckboxButtons";
import { useAppDispatch, useAppSelector } from "../../../../src/hooks/redux";
import {
  setResetBrands,
  setBrands,
} from "../../../../store/reducers/FilterSlice";
import { AppStackParamList } from "../../../../navigation/routes/app-navigation";

type BrandsProps = {
  route: RouteProp<AppStackParamList, "Brands">;
};

const Brands: FC<BrandsProps> = ({ route }) => {
  const { goBack } = useNavigation();
  const { brandsList } = route.params;
  const { brands } = useAppSelector((state) => state.FilterReducer);
  const dispatch = useAppDispatch();

  const [values, setValues] = useState<string[]>(brands);

  const onSelectHandle = (value: string) => {
    const index = values.indexOf(value);
    if (index > -1) {
      setValues(values.filter((_, i) => i !== index));
    } else {
      setValues([...values, value]);
    }
  };

  const resetHandle = () => {
    setValues([]);
    dispatch(setResetBrands());
  };

  const applyHandle = () => {
    dispatch(setBrands(values));
    goBack();
  };

  return (
    <Layout
      noMenu
      isBottomButton
      header={<Header title="Бренд" leftIcon navigationHandle={goBack} />}
      bottomButton={
        <BlockBottomButtons
          borderTop
          buttons
          onPressApplayButtonHandle={applyHandle}
          onPressResetButtonHandle={resetHandle}
          titleApplayButton="Применить"
        />
      }
    >
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <BlockCheckboxButtons
          variant={"vertical"}
          rowGap={20}
          list={brandsList}
          selected={values}
          onSelect={onSelectHandle}
        />
      </View>
    </Layout>
  );
};

export default Brands;
