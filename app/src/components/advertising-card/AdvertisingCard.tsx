import { View, Text, Image, ImageProps } from "react-native";
import { styles } from "./styles";
import { FC, ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "../../hooks/redux";
import Sceleton from "../sceleton/Sceleton";

type AdvertisingCardType = {
  title?: string;
  text?: string;
  img?: any;
};

const AdvertisingCard: FC<AdvertisingCardType> = ({ title, text, img }) => {
  const { isLoading } = useAppSelector((state) => state.AppReducer);

  if (isLoading) {
    return (
      <View style={styles.wrap}>
        <Sceleton height={200} borderRadius={20} />
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <LinearGradient
        colors={[
          "#B1AEAE",
          "#D5D3D2",
          "#D5D3D2",
          "#D5D3D2",
          "#D5D3D2",
          "#B1AEAE",
        ]}
        start={{ x: 1, y: 0.2 }}
        end={{ x: 0, y: 0 }}
        style={{ borderRadius: 20 }}
      >
        <View style={styles.header}>
          <View style={styles.title}>
            <Text style={{ color: "#272728", fontSize: 20, fontWeight: "600" }}>
              {title}
            </Text>
          </View>

          <View style={styles.text}>
            <Text style={{ color: "#272728", fontSize: 16 }}>{text}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Image source={img} style={styles.img} />
        </View>
      </LinearGradient>
    </View>
  );
};

export default AdvertisingCard;
