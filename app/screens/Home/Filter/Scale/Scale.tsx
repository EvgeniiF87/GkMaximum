import React, { FC, useState } from "react";
import Layout from "../../../../src/components/layout/Layout";
import Header from "../../../../src/components/header/Header";
import BlockBottomButtons from "../../../../src/components/BlockBottomButtons/BlockBottomButtons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import BlockCheckboxButtons from "../../../../src/components/block-checkbox-buttons/BlockCheckboxButtons";
import { useAppDispatch, useAppSelector } from "../../../../src/hooks/redux";
import {
  setScale,
  setResetScale,
} from "../../../../store/reducers/FilterSlice";
import { AppStackParamList } from "../../../../navigation/routes/app-navigation";

type ScaleProps = {
  route: RouteProp<AppStackParamList, "Scale">;
};

const Scale: FC<ScaleProps> = ({ route }) => {
  const { goBack } = useNavigation();
  const { scaleList } = route?.params;
  const { scale } = useAppSelector((state) => state.FilterReducer);
  const dispatch = useAppDispatch();

  const [values, setValues] = useState<string[]>(scale);

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
    dispatch(setResetScale());
  };

  const applyHandle = () => {
    dispatch(setScale(values));
    goBack();
  };

  return (
    <Layout
      noMenu
      isBottomButton
      header={<Header title="Линейка" leftIcon navigationHandle={goBack} />}
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
          list={scaleList}
          selected={values}
          onSelect={onSelectHandle}
        />
      </View>
    </Layout>
  );
};

export default Scale;
