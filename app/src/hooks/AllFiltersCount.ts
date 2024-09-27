import { setFiltersCount } from "../../store/reducers/FilterSlice";
import { useAppDispatch, useAppSelector } from "./redux";

export const useAllFiltersCount = () => {
  const { sorted, offers, price, brands, appointment, filterSale, category } =
    useAppSelector((state) => state.FilterReducer);
  const dispatch = useAppDispatch();

  const allFiltersCount = () => {
    const allFiltersCount = [];

    if (sorted.value !== 0) allFiltersCount.push(sorted.label);
    if (offers.value !== 0) allFiltersCount.push(offers.label);
    if (price.max && price.min) allFiltersCount.push("price");
    if (brands.length > 0) allFiltersCount.push("brands");
    if (appointment.length > 0) allFiltersCount.push("appointment");
    if (filterSale) allFiltersCount.push("sale");
    if (category !== "") allFiltersCount.push("category");

    dispatch(setFiltersCount(allFiltersCount));
  };

  return { allFiltersCount };
};
