import { Platform, View } from "react-native";
import ButtonGradient from "../../ui/button-gradient/ButtonGradient";
import { FC } from "react";
import ButtonOutline from "../../ui/ButtonOutline.tsx/ButtonOutline";
import Button from "../../ui/button/Button";

type BlockBottomButtonsProps = {
  titleApplayButton?: string;
  isDisabledApplayButton?: boolean;
  buttons?: boolean;
  isInStock?: boolean;
  isBasket?: boolean;
  isBasketTitle?: string;
  isInStockNotification?: boolean;
  isCategoryReset?: boolean;
  borderTop?: boolean;
  isFilterScreen?: boolean;
  paddingBottom?: number;
  onPressApplayButtonHandle?: () => void;
  onPressResetButtonHandle?: () => void;
  inStockHandle?: () => void;
  isBasketHandle?: () => void;
};

const BlockBottomButtons: FC<BlockBottomButtonsProps> = ({
  titleApplayButton,
  isDisabledApplayButton,
  buttons,
  isInStock,
  isBasket,
  isBasketTitle,
  isInStockNotification,
  isCategoryReset,
  borderTop,
  paddingBottom,
  isFilterScreen,
  onPressApplayButtonHandle,
  onPressResetButtonHandle = () => {},
  inStockHandle = () => {},
  isBasketHandle = () => {},
}) => {
  return (
    <View
      style={[
        {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: buttons ? "space-between" : "center",
          columnGap: 20,
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: paddingBottom ? paddingBottom : 0,
          borderTopWidth: borderTop ? 0.2 : 0,
          borderColor: borderTop ? "rgb(137, 142, 159, 0.80)" : "",
          backgroundColor: "#fff",
        },
      ]}
    >
      {buttons && (
        <ButtonOutline
          title="Сбросить"
          onPressHandle={onPressResetButtonHandle}
          type="primary"
          _styles={[
            Platform.select({ android: { marginBottom: 10, flex: 1 } }),
          ]}
        />
      )}

      {isCategoryReset && (
        <ButtonOutline
          title="Сбросить"
          onPressHandle={onPressResetButtonHandle}
          type="dark"
          _styles={[
            Platform.select({ android: { marginBottom: 10, flex: 1 } }),
          ]}
        />
      )}

      {!isCategoryReset && (
        <>
          {isInStock ? (
            <>
              {!isInStockNotification && (
                <ButtonOutline
                  title="Узнать о поступлении"
                  onPressHandle={inStockHandle}
                  type={"dark"}
                />
              )}
            </>
          ) : (
            <>
              {!isBasket ? (
                <ButtonGradient
                  title={titleApplayButton ? titleApplayButton : "Применить"}
                  onPressHandle={onPressApplayButtonHandle}
                  isDisabled={isDisabledApplayButton}
                  _styles={[
                    Platform.select({
                      android: { marginBottom: isFilterScreen ? 10 : 0 },
                    }),
                  ]}
                />
              ) : (
                <Button
                  fontSize={16}
                  title={isBasketTitle ? isBasketTitle : ""}
                  onPressHandle={isBasketHandle}
                  type={"primary"}
                />
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default BlockBottomButtons;
