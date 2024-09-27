export const validateBase = (
  value: string | undefined,
  match: string | RegExp
) => {
  return String(value).toLowerCase().match(match);
};
