import { FC } from "react";
import ButtonGradient from "../../ui/button-gradient/ButtonGradient";

type AuthButtonProps = {
  title: string;
  isDisabled: boolean;
  onPressHandle: () => void;
};

const AuthButton: FC<AuthButtonProps> = ({
  title,
  onPressHandle,
  isDisabled,
}) => {
  return (
    <ButtonGradient
      title={title}
      onPressHandle={onPressHandle}
      isDisabled={isDisabled}
    />
  );
};

export default AuthButton;
