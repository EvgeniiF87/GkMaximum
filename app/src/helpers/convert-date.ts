export const convertDate = (date: string, revers?: boolean | undefined) => {
  if (date.length === 0) return "";
  let dateConvert: string = "";

  if (revers) {
    const originalDate = date.split(".");
    dateConvert = `${originalDate[2]}-${originalDate[1]}-${originalDate[0]}`;
  } else {
    dateConvert = new Date(date).toLocaleString("ru").substring(0, 10);
  }

  return dateConvert;
};

const convertNumberToMonth = (number: string) => {
  let month: string = "";

  switch (number) {
    case "01":
      month = "января";
      break;
    case "02":
      month = "февраля";
      break;
    case "03":
      month = "марта";
      break;
    case "04":
      month = "апреля";
      break;
    case "05":
      month = "мая";
      break;
    case "06":
      month = "июня";
      break;
    case "07":
      month = "июля";
      break;
    case "08":
      month = "августа";
      break;
    case "09":
      month = "сентября";
      break;
    case "10":
      month = "октября";
      break;
    case "11":
      month = "ноября";
      break;
    case "12":
      month = "декабря";
      break;
  }

  return month;
};

export const convertDateToDayAndMonth = (date: string) => {
  let dateConvert: string = "";
  let originalDate = new Date(date).toLocaleString("ru").substring(0, 10);
  const dateArr = originalDate.split(".");
  dateConvert = `${dateArr[0]} ${convertNumberToMonth(dateArr[1])}`;
  return dateConvert;
};

export const convertDateToDayAndMonthAndYear = (date: string) => {
  let dateConvert: string = "";
  let originalDate = new Date(date).toLocaleString("ru").substring(0, 10);
  const dateArr = originalDate.split(".");
  dateConvert = `${dateArr[0]} ${convertNumberToMonth(dateArr[1])} ${
    dateArr[2]
  }`;
  return dateConvert;
};
