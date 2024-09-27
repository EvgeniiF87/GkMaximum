import { validateBase } from "./validation-base";

const match = /^\d{2}[./-]\d{2}[./-]\d{4}$/;

export const validateDate = (text: string | undefined) => {
  return validateBase(text, match);
};
