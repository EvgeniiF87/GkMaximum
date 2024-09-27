import { useState } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  Dimensions,
  PixelRatio,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonGradient from "../../src/ui/button-gradient/ButtonGradient";
import { Icon } from "../../src/components/Icon/Icon";
import { AppIcons } from "../../src/Icons";
import { useRunApplication } from "../../src/hooks/RunApplication";
import OnboardingScreenImg1 from "../../../assets/onbording-img-1.jpg";
import OnboardingScreenImg2 from "../../../assets/onbording-img-2.jpg";
import OnboardingScreenImg3 from "../../../assets/onbording-img-3.jpg";

const { width } = Dimensions.get("window");

const onbordings = [
  {
    title: "При регистрации дарим 500 подарочных бонусов",
    description:
      "Копи обменивай бонусы на скидку по системе 1 бонус = 1 рубль. Так, покупая у нас, ты не только получаешь качественные товары, но и экономишь на своих будущих покупках!",
    image: OnboardingScreenImg1,
    buttonText: "Далее",
  },
  {
    title: "В Maximum ты найдешь новые любимые продукты!",
    description:
      "Для того чтобы предлагать только самые актуальные предложения, нам важно отслеживать твою активность и предпочтения в интернете.",
    image: OnboardingScreenImg2,
    buttonText: "Далее",
  },
  {
    title: "Легкое оформление заказа и быстрая доставка!",
    description:
      "Все, что нужно для сохранения своей красоты и заботы о себе, теперь всегда у тебя под рукой.",
    image: OnboardingScreenImg3,
    buttonText: "Перейти к покупкам!",
  },
];

const Onboarding = () => {
  const { top } = useSafeAreaInsets();
  const [cIndex, setCIndex] = useState<number>(0);
  const { runApplication } = useRunApplication();
  const DPI = PixelRatio.get();

  const calculateContainer = () => {
    let sum = 0;

    if (Platform.OS === "ios") {
      if (DPI === 3) sum = top - 30;
      if (DPI === 2) sum = top;
    } else {
      sum = top + 10;
    }

    return sum;
  };

  const onboarding = onbordings[cIndex];

  const onPressHandle = () => {
    if (cIndex === onbordings.length - 1) {
      runApplication();
    } else {
      setCIndex(cIndex + 1);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        paddingTop: top,
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: "absolute",
            top: calculateContainer(),
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            zIndex: 99,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              columnGap: 8,
              width: "70%",
            }}
          >
            {onbordings.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 38,
                  height: 1,
                  backgroundColor: index === cIndex ? "#272727" : "#61636C",
                  borderRadius: 4,
                }}
              />
            ))}
          </View>

          {cIndex === 2 ? (
            <TouchableOpacity onPress={onPressHandle}>
              <Icon viewBox="18 18" size={15} path={AppIcons.app.cross()} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPressHandle}>
              <Icon viewBox="8 14" size={15} path={AppIcons.app.arrowRight()} />
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            position: "absolute",
            left: 0,
            right: 0,
            top: DPI > 2 ? 20 : 50,
          }}
        >
          <Image
            source={onboarding.image}
            style={{
              width,
              height: DPI > 2 ? width * 1.25 : width * 1,
              resizeMode: "cover",
            }}
          />
          <View
            style={[
              {
                width,
                backgroundColor: "#fff",
                paddingHorizontal: 20,
                marginTop: 8,
              },
              Platform.select({
                android: { elevation: -20, shadowColor: "#fff" },
                ios: {
                  shadowColor: "#fff",
                  shadowOffset: { width: 0, height: -20 },
                  shadowRadius: 10,
                  shadowOpacity: 10,
                },
              }),
            ]}
          >
            {cIndex === 0 ? (
              <Text
                style={{
                  fontSize: DPI === 2 ? 14 : 18,
                  fontWeight: "600",
                  lineHeight: 23.4,
                  color: "#272728",
                }}
              >
                При регистрации дарим{" "}
                <Text
                  style={{
                    fontSize: DPI === 2 ? 14 : 18,
                    fontWeight: "600",
                    lineHeight: 23.4,
                    color: "#DE002B",
                  }}
                >
                  500
                </Text>{" "}
                подарочных бонусов
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: DPI === 2 ? 14 : 18,
                  fontWeight: "600",
                  lineHeight: 23.4,
                  color: "#272728",
                }}
              >
                {onboarding.title}
              </Text>
            )}
          </View>

          <View
            style={{ paddingHorizontal: 20, marginTop: 10, marginBottom: 100 }}
          >
            <Text
              style={{
                fontSize: DPI === 2 ? 12 : 14,
                fontWeight: "400",
                lineHeight: 18.2,
                color: "#272728",
              }}
            >
              {onboarding.description}
            </Text>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            width,
            paddingHorizontal: 20,
            marginTop: 20,
            flex: 1,
          }}
        >
          <ButtonGradient
            title={onboarding.buttonText}
            onPressHandle={onPressHandle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
