import { JSX } from "react";
import { AppIcons } from "../Icons";
import { useAppSelector } from "./redux";

type ContactListType = {
  icon: JSX.Element;
  title: string;
  text: string;
  viewBox: string;
};

export const useContactList = () => {
  const { configurationKeys } = useAppSelector(
    (state) => state.ConfigurationKeysAndDocumentsReducer
  );

  let contactCity: string = "";
  let contactStreet: string = "";
  let contactPhone: string = "";
  let contactEmail: string = "";
  let operatingMode: string = "";

  configurationKeys.map((config) => {
    if (config.name === "contactCity") {
      contactCity = config.key;
    } else if (config.name === "contactStreet") {
      contactStreet = config.key;
    } else if (config.name === "contactPhone") {
      contactPhone = config.key;
    } else if (config.name === "contactEmail") {
      contactEmail = config.key;
    } else if (config.name === "operatingMode") {
      operatingMode = config.key;
    }
  });

  const contactsList: ContactListType[] = [
    {
      icon: AppIcons.app.location(),
      title: "Адрес",
      text: `г. ${contactCity}, ул. ${contactStreet}`,
      viewBox: "16 22",
    },
    {
      icon: AppIcons.app.phone(),
      title: "Телефон",
      text: contactPhone,
      viewBox: "20 20",
    },
    {
      icon: AppIcons.app.email(),
      title: "E-mail",
      text: contactEmail,
      viewBox: "18 14",
    },
    {
      icon: AppIcons.app.clock(),
      title: "Режим работы",
      text: operatingMode,
      viewBox: "18 18",
    },
  ];

  return { contactsList };
};
