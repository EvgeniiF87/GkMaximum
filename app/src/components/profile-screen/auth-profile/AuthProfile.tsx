import { View } from "react-native";
import BlockUserInfo from "./BlockUserInfo";
import BlockUserBonusCard from "./BlockUserBonusCard";
import BlockOther from "./BlockOther";
import BlockSpecialOfferForUser from "./BlockSpecialOfferForUser";
import { useAppSelector } from "../../../hooks/redux";

const AuthProfile = () => {
  const { user } = useAppSelector((state) => state.userReducer);

  return (
    <View>
      <BlockUserInfo />
      {user.id !== 169 && <BlockUserBonusCard />}
      <BlockOther />
      {user.role !== "wholesaler" && <BlockSpecialOfferForUser />}
    </View>
  );
};

export default AuthProfile;
