import { FC, ReactNode } from "react";
import {
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NotificationsAlert from "../alert-notification/AlertNotification";
import Spiner from "../spiner/Spiner";
import { useAppSelector } from "../../hooks/redux";

type LayoutPropsType = {
  children: ReactNode;
  backgroundColor?: string;
  isEmpty?: boolean;
  productNotAuthAlert?: boolean;
  isNotification?: boolean;
  isBottomButton?: boolean;
  noMenu?: boolean;
  checkCodeScreen?: boolean;
  notScroll?: boolean;
  header?: ReactNode;
  search?: ReactNode;
  bottomButton?: ReactNode;
};

const Layout: FC<LayoutPropsType> = ({
  children,
  backgroundColor = "#fff",
  isEmpty,
  isNotification,
  isBottomButton,
  header,
  search,
  bottomButton,
  noMenu,
  checkCodeScreen,
  notScroll,
}) => {
  const { top } = useSafeAreaInsets();
  const { isSpiner, titleSpiner } = useAppSelector((state) => state.AppReducer);

  if (noMenu) {
    return (
      <SafeAreaView
        style={[
          { flex: 1, backgroundColor },
          Platform.select({ android: { paddingTop: top } }),
        ]}
      >
        {isSpiner && (
          <Spiner title={titleSpiner ? titleSpiner : "Загрузка..."} />
        )}
        {notScroll ? (
          <>
            <View
              style={{
                position: "absolute",
                top,
                left: 0,
                right: 0,
                zIndex: 600,
              }}
            >
              {header && header}
            </View>
            {children}
          </>
        ) : (
          <View style={{ flex: 1 }}>
            {isNotification && <NotificationsAlert />}
            {header && header}
            {!checkCodeScreen ? (
              <>
                <ScrollView
                  style={{ flex: 1 }}
                  automaticallyAdjustKeyboardInsets={true}
                  showsVerticalScrollIndicator={false}
                >
                  {children}
                </ScrollView>
                {isBottomButton && bottomButton}
              </>
            ) : (
              <>{children}</>
            )}
          </View>
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: "#fff" },
        Platform.select({ android: { paddingTop: top } }),
      ]}
    >
      {isSpiner && <Spiner title={titleSpiner ? titleSpiner : "Загрузка..."} />}
      <View style={{ flex: 1, backgroundColor }}>
        <NotificationsAlert />
        {header && header}
        {search && search}
        {isEmpty ? (
          <View style={styles.emptyContent}>{children}</View>
        ) : (
          <ScrollView
            horizontal={false}
            showsVerticalScrollIndicator={false}
            automaticallyAdjustKeyboardInsets={true}
            // centerContent={isEmpty}
          >
            <View style={styles.content}>{children}</View>
          </ScrollView>
        )}
        {isBottomButton && (
          <View
            style={{
              position: "absolute",
              bottom: 35,
              left: 0,
              right: 0,
            }}
          >
            {bottomButton}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    ...Platform.select({
      android: { marginBottom: 80 },
      ios: { marginBottom: 100 },
    }),
  },
  emptyContent: {
    ...Platform.select({
      android: { marginBottom: 80 },
      ios: { marginBottom: 100 },
    }),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Layout;
