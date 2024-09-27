import { ArrowLeftSvg } from "./ArrowLeftSvg";
import { ArrowRightSvg } from "./ArrowRightSvg";
import { SearchSvg } from "./SearchSvg";
import { BasketSvg } from "./tab-navigation/BasketSvg";
import { CatalogAndSearchSvg } from "./tab-navigation/CatalogAndSearchSvg";
import { FavoritesSvg } from "./tab-navigation/FavoritesSvg";
import { MainSvg } from "./tab-navigation/MainSvg";
import { ProfileSvg } from "./tab-navigation/ProfileSvg";
import { HeadsetHelpSvg } from "./HeadsetHelpSvg";
import { GoogleSvg } from "./GoogleSvg";
import { WkSvg } from "./WkSvg";
import { InstagramSvg } from "./InstagramSvg";
import { AppleSvg } from "./AppleSvg";
import { HideEyeSvg } from "./HideEyeSvg";
import { EyeSvg } from "./EyeSvg";
import { CheckMarkSvg } from "./CheckMarkSvg";
import { CrossSvg } from "./CrossSvg";
import { ClarityErrorSvg } from "./ClarityErrorSvg";
import { ArrowRotateSvg } from "./ArrowRotateSvg";
import { FilterSvg } from "./FilterSvg";
import { NotificationSvg } from "./NotificationSvg";
import { BigBasketSvg } from "./BigBasketSvg";
import { LogoutSvg } from "./LogoutSvg";
import { BonusSvg } from "./BonusSvg";
import { PlusSvg } from "./PlusSvg";
import { LocationSvg } from "./LocationSvg";
import { PhoneSvg } from "./PhoneSvg";
import { EmailSvg } from "./EmailSvg";
import { ClockSvg } from "./ClockSvg";
import { FillFavoritesSvg } from "./FillFavoritesSvg";
import { DefaultManagerAvatarSvg } from "./DefaultManagerAvatar";
import { EditPaintSvg } from "./EditPaintSvg";
import { StartDeliverySvg } from "./StartDeliverySvg";
import { EndDeliverySvg } from "./EndDeliverySvg";
import { StarSvg } from "./StarSvg";
import { VerticalArrowsSvg } from "./VerticalArrowsSvg";
import { MinusSvg } from "./MinusSvg";
import { EllipsisSvg } from "./EllipsisSvg";

export const AppIcons = {
  tabNavigationIcons: {
    main: (color?: string) => MainSvg(color),
    catalogAndSearch: (color?: string) => CatalogAndSearchSvg(color),
    favorites: (color?: string) => FavoritesSvg(color),
    basket: (color?: string) => BasketSvg(color),
    profile: (color?: string) => ProfileSvg(color),
  },
  app: {
    arrowRight: (color?: string) => ArrowRightSvg(color),
    arrowLeft: (color?: string) => ArrowLeftSvg(color),
    arrowRotate: (color?: string) => ArrowRotateSvg(color),
    search: (color?: string) => SearchSvg(color),
    headsetHelp: (color?: string) => HeadsetHelpSvg(color),
    google: (color?: string) => GoogleSvg(color),
    wk: (color?: string) => WkSvg(color),
    instagram: (color?: string) => InstagramSvg(color),
    apple: (color?: string) => AppleSvg(color),
    hideEye: (color?: string) => HideEyeSvg(color),
    eye: (color?: string) => EyeSvg(color),
    checkMark: (color?: string) => CheckMarkSvg(color),
    cross: (color?: string) => CrossSvg(color),
    clarityError: (color?: string) => ClarityErrorSvg(color),
    filter: (color?: string) => FilterSvg(color),
    notification: (color?: string) => NotificationSvg(color),
    bigBasket: (color?: string) => BigBasketSvg(color),
    logout: (color?: string) => LogoutSvg(color),
    bonus: (color?: string) => BonusSvg(color),
    plus: (color?: string) => PlusSvg(color),
    minus: (color?: string) => MinusSvg(color),
    location: (color?: string) => LocationSvg(color),
    phone: (color?: string) => PhoneSvg(color),
    email: (color?: string) => EmailSvg(color),
    clock: (color?: string) => ClockSvg(color),
    fillFavorites: (color?: string) => FillFavoritesSvg(color),
    defaultManagerAvatar: (color?: string) => DefaultManagerAvatarSvg(color),
    editPaint: (color?: string) => EditPaintSvg(color),
    startDeliverySvg: (color?: string) => StartDeliverySvg(color),
    endDeliverySvg: (color?: string) => EndDeliverySvg(color),
    star: (color?: string) => StarSvg(color),
    verticalArrows: (color?: string) => VerticalArrowsSvg(color),
    ellipsis: (color?: string) => EllipsisSvg(color),
  },
};
