import { FC } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Platform,
} from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedProps,
  runOnJS,
} from "react-native-reanimated";
import { Shadow } from "react-native-shadow-2";

type InputRangeProps = {
  min: number;
  max: number;
  step: number;
  currency?: string;
  onChangeValue: (minValue: number, maxValue: number) => void;
};

const KNOBSIZE = 30;
const WIDTH = Dimensions.get("window").width - 60;
const MAXWIDTH = WIDTH - KNOBSIZE / 2 + 6;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const InputRange: FC<InputRangeProps> = ({
  min,
  max,
  step,
  onChangeValue,
  currency = "₽",
}) => {
  const xKnob1 = useSharedValue(0);
  const scaleKnob1 = useSharedValue(1);
  const xKnob2 = useSharedValue(MAXWIDTH);
  const scaleKnob2 = useSharedValue(1);

  const runOnJSHandle = (minValue: number, maxValue: number) => {
    onChangeValue(minValue, maxValue);
  };

  const gestureHandler1 = useAnimatedGestureHandler({
    onStart: (_, ctx: { startX: number }) => {
      ctx.startX = xKnob1.value;
    },
    onActive: (event, ctx: { startX: number }) => {
      scaleKnob1.value = 1.1;
      xKnob1.value =
        ctx.startX + event.translationX < 0
          ? 0
          : ctx.startX + event.translationX > xKnob2.value
          ? xKnob2.value
          : ctx.startX + event.translationX;
    },
    onEnd: () => {
      scaleKnob1.value = 1;
      let minValue =
        Math.round((min + (xKnob1.value / MAXWIDTH) * (max - min)) / step) *
        step;

      let maxValue =
        Math.round((min + (xKnob2.value / MAXWIDTH) * (max - min)) / step) *
        step;
      runOnJS(onChangeValue)(minValue, maxValue);
    },
  });

  const gestureHandler2 = useAnimatedGestureHandler({
    onStart: (_, ctx: { startX: number }) => {
      ctx.startX = xKnob2.value;
    },
    onActive: (event, ctx: { startX: number }) => {
      scaleKnob2.value = 1.1;
      xKnob2.value =
        ctx.startX + event.translationX < xKnob1.value
          ? xKnob1.value
          : ctx.startX + event.translationX > MAXWIDTH
          ? MAXWIDTH
          : ctx.startX + event.translationX;
    },
    onEnd: () => {
      scaleKnob2.value = 1;
      let minValue =
        Math.round((min + (xKnob1.value / MAXWIDTH) * (max - min)) / step) *
        step;

      let maxValue =
        Math.round((min + (xKnob2.value / MAXWIDTH) * (max - min)) / step) *
        step;
      runOnJS(onChangeValue)(minValue, maxValue);
    },
  });

  const styleLine = useAnimatedStyle(() => {
    return {
      backgroundColor: "#DE002B",
      height: 3,
      marginTop: -3,
      borderRadius: 2,
      width: xKnob2.value - xKnob1.value,
      transform: [{ translateX: xKnob1.value }],
    };
  });

  const styleKnob1 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: xKnob1.value,
        },
        {
          scale: scaleKnob1.value,
        },
      ],
    };
  });

  const styleKnob2 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: xKnob2.value,
        },
        {
          scale: scaleKnob2.value,
        },
      ],
    };
  });

  const propsInput1 = useAnimatedProps(() => {
    return {
      value: `От ${
        Math.round((min + (xKnob1.value / MAXWIDTH) * (max - min)) / step) *
        step
      } ${currency}`,
      text: `От ${
        Math.round((min + (xKnob1.value / MAXWIDTH) * (max - min)) / step) *
        step
      } ${currency}`,
    };
  });

  const propsInput2 = useAnimatedProps(() => {
    return {
      value: `До ${
        Math.round((min + (xKnob2.value / MAXWIDTH) * (max - min)) / step) *
        step
      } ${currency}`,
      text: `До ${
        Math.round((min + (xKnob2.value / MAXWIDTH) * (max - min)) / step) *
        step
      } ${currency}`,
    };
  });

  return (
    <View
      style={{
        width: WIDTH,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <GestureHandlerRootView>
        <View style={styles.wrap}>
          <Shadow distance={6} offset={[0, 3]} startColor="#dddddd">
            <AnimatedTextInput
              defaultValue={"0"}
              editable={false}
              animatedProps={propsInput1}
              style={styles.label}
            />
          </Shadow>
          <Shadow distance={6} offset={[0, 3]} startColor="#dddddd">
            <AnimatedTextInput
              defaultValue={"0"}
              editable={false}
              animatedProps={propsInput2}
              style={styles.label}
            />
          </Shadow>
        </View>

        <View
          style={{ height: 3, backgroundColor: "#898E9F", borderRadius: 2 }}
        />
        <GestureHandlerRootView>
          <Animated.View style={styleLine} />
          <PanGestureHandler onGestureEvent={gestureHandler1}>
            <Animated.View style={[styles.knob, styleKnob1]} />
          </PanGestureHandler>

          <PanGestureHandler onGestureEvent={gestureHandler2}>
            <Animated.View style={[styles.knob, styleKnob2]} />
          </PanGestureHandler>
        </GestureHandlerRootView>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: WIDTH,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    ...Platform.select({
      ios: { padding: 8, fontWeight: "600" },
      android: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        fontWeight: "800",
      },
    }),
    color: "#272728",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  knob: {
    position: "absolute",
    height: KNOBSIZE,
    width: KNOBSIZE,
    borderRadius: KNOBSIZE / 2,
    borderColor: "#DE002B",
    borderWidth: 2,
    backgroundColor: "#fff",
    marginTop: -KNOBSIZE + 13,
    marginLeft: -9,
  },
});

export default InputRange;
