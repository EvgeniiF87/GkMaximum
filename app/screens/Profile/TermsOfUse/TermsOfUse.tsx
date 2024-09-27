import HTMLView from "react-native-htmlview";
import Layout from "../../../src/components/layout/Layout";
import Header from "../../../src/components/header/Header";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../../src/hooks/redux";
import { View, StyleSheet } from "react-native";

const TermsOfUse = () => {
  const { goBack } = useNavigation();
  const { termsOfUse } = useAppSelector(
    (state) => state.ConfigurationKeysAndDocumentsReducer
  );

  return (
    <Layout
      header={
        <Header
          title="Пользовательское соглашение"
          leftIcon
          navigationHandle={goBack}
        />
      }
    >
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
        }}
      >
        <HTMLView value={termsOfUse.data || ""} stylesheet={styles} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 16,
    fontWeight: "400",
    color: "#272728",
    lineHeight: 15.6,
  },
  h2: {
    fontSize: 12,
    fontWeight: "400",
    color: "#272728",
    lineHeight: 15.6,
  },
  p: {
    fontSize: 1,
  },
});

export default TermsOfUse;
