import {
  View,
  Image,
  Text,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { AppIcons } from "../../Icons";
import ButtonOutline from "../../ui/ButtonOutline.tsx/ButtonOutline";
import { Icon } from "../Icon/Icon";
import BonusCardPng from "../../../../assets/bonus-card.png";
import { useAppSelector } from "../../hooks/redux";
import { FC, useState } from "react";
import Svg, { Image as SvgImage } from "react-native-svg";

const { width } = Dimensions.get("window");
const height = (width / 100) * 49;

type Base64ToSvgProps = {
  base64String: string | undefined;
};

const Base64ToSvg: FC<Base64ToSvgProps> = ({ base64String }) => {
  return (
    <Svg width={150} height={150}>
      <SvgImage
        x="0"
        y="0"
        width={150}
        height={150}
        fill={"none"}
        stroke={"#fff"}
        href={{ uri: `data:image/svg+xml;base64,${base64String}` }}
      />
    </Svg>
  );
};

const BonusCard = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const qrCode = user.bonus_qr?.split(",")[1];
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotationValue] = useState(new Animated.Value(0));
  const [zIndexValue] = useState(new Animated.Value(0));

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    Animated.timing(rotationValue, {
      toValue: isFlipped ? 0 : 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    Animated.timing(zIndexValue, {
      toValue: isFlipped ? 0 : 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const frontRotateStyle = {
    elevation: rotationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        rotateY: rotationValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
      { perspective: 10000 },
    ],
    zIndex: zIndexValue.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 0],
    }),
  };

  const backRotateStyle = {
    elevation: rotationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        rotateY: rotationValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
      { perspective: 10000 },
    ],
    zIndex: zIndexValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 30],
    }),
  };

  return (
    <View>
      <Animated.View
        style={[
          {
            width,
            height,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          },
          backRotateStyle,
        ]}
      >
        <View style={{ transform: [{ rotateY: "180deg" }] }}>
          <Image
            source={BonusCardPng}
            style={{
              width: width - 50,
              height,
              resizeMode: "cover",
              borderRadius: 16,
              transform: [{ rotateY: "180deg" }],
            }}
          />
          <View
            style={{
              position: "absolute",
              left: 0,
              top: 5,
              right: 0,
              bottom: 0,
              zIndex: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Image
              source={{ uri: user.bonus_qr }}
              style={{
                width: width - 200,
                height: height,
                backgroundColor: "#fff",
              }}
            /> */}

            <Base64ToSvg base64String={qrCode} />

            <TouchableOpacity
              onPress={handleFlip}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 30,
                height: 30,
                position: "absolute",
                left: 10,
                top: 85,
                zIndex: 10,
                borderColor: "#fff",
                borderWidth: 1.2,
                borderRadius: 200,
              }}
            >
              <Icon
                viewBox="8 14"
                size={17}
                path={AppIcons.app.arrowLeft("#fff")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          {
            width,
            height,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          },
          frontRotateStyle,
        ]}
      >
        <Image
          source={BonusCardPng}
          style={{
            width: width - 50,
            height,
            resizeMode: "cover",
            borderRadius: 16,
          }}
        />
        <View
          style={{
            position: "absolute",
            left: 40,
            top: 15,
            zIndex: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon viewBox="30 30" size={30} path={AppIcons.app.bonus("#fff")} />
          <Text
            style={{
              fontSize: 18,
              color: "#fff",
              fontWeight: "600",
              marginLeft: 5,
            }}
          >
            {user.bonus_count ? user.bonus_count : 0} БОНУСОВ
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            left: 40,
            bottom: 18,
            zIndex: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#fff",
              fontWeight: "600",
              marginLeft: 5,
            }}
          >
            GkMaximum
          </Text>
        </View>

        <View
          style={{
            width: 80,
            position: "absolute",
            right: 40,
            bottom: 14,
            zIndex: 10,
          }}
        >
          <ButtonOutline
            title="QR-КОД"
            type={"white"}
            fontSize={12}
            _styles={{ width: 80 }}
            paddingHorizontal={14}
            paddingVertical={8}
            onPressHandle={handleFlip}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default BonusCard;
