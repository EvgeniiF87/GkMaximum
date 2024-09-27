export const devApiUrl = "https://gkmaximum.backend.demowts.ru";
export const devApiImgUrl =
  "https://gkmaximum.backend.demowts.ru/public/uploads/images";
export const devApiAvatarUrl =
  "https://gkmaximum.backend.demowts.ru/public/uploads/avatars";

export const logsServerUrl = "https://log.backend.webteamstorm.ru";

export const authApiEndpoints = {
  registrationEmail: "api/register/email",
  registrationPhone: "api/register/phone",
  verifyCode: "api/verify_code",
  loginEmail: "api/login/email",
  loginPhone: "api/login/phone",
  logout: "api/logout",
  changePassword: "api/change/password",
  changePasswordVerify: "api/change/password/verify",
  changePasswordReset: "api/change/password/reset",
};

export const mainScreenEndpoint = "api/items/forMain?region";
export const mainScreenAllProductsEndpoint = "api/items/preview?region";
export const promotionsEndpoint = "api/items/byDiscount?region";
export const newsEndpoint = "api/items/byCreate?region";
export const hitsEndpoint = "api/items/byHit?region";
export const productFullInfo = "/api/items";
export const allFiltersEndpoint = "/api/items/filter";
export const resultFilterEndpoint = "/api/items/byFilter";
export const regionsEndpoint = "api/regions";
export const favoriteEndpoint = "api/favourites";

export const categoriesEndpoint = "api/category/tree";
export const selectedCategoryProducts = "api/items/category";

export const MyAddressEndpoint = "api/users/address";

export const userApiEndpoints = {
  currentUser: "api/users/current",
  userAvatar: "api/users/current/avatar",
  userChangePassword: "api/users/current/password",
};

export const historyOrdersEndpoint = "api/order_history/current/preview";
export const orderFullInfoEndpoint = "api/order_history";
export const cancelOrderEndpoint = "api/order_history/canceled";

export const feedbackEndpoint = "api/items/feedback";

export const reviewsStatisticsEndpoint = "api/items/feedback/preview?item_id";
export const sortedReviewsCommentsEndpoint = "api/items/feedback/filtered";
export const allReviewsCommentsEndpoint = "api/items/feedback/all";

export const addFirstProductBasketEndpoint = "api/shopping_cart";
export const addOrRemoveProductBasketEndpoint = "api/shopping_cart/count";
export const getAllProductsBasketEndpoint = "api/shopping_cart";
export const deleteProductBasketEndpoint = "api/shopping_cart/delete";

export const configurationKeysEndpoint = "api/configuration/keys";

export const placingAnOrderEndpoint = "api/accepted_order";

export const notificationProductStock = "api/notification/stock";

export const searchEndpoint = "api/items";

export const bannersEndpoint = "api/banners/region";
