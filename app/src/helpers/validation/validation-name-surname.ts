import { validateBase } from "./validation-base";

const match = /^[а-яА-Я]+$/;

export const validateNameAndSurname = (text: string | undefined) => {
  return validateBase(text, match);
};
