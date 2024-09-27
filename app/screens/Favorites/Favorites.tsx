import { useAppSelector } from "../../src/hooks/redux";
import AuthFavoriteEmpty from "../../src/components/auth-favorite/AuthFavoriteEmpty";
import NotAuthFavorite from "../../src/components/not-auth-favorite/NotAuthFavorite";
import { useGetFavoritesQuery } from "../../api/Favorite/FavoriteApi";
import Layout from "../../src/components/layout/Layout";

const Favorites = () => {
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const {} = useGetFavoritesQuery({});
  const { data, isLoading } = useGetFavoritesQuery({});

  return (
    <Layout isEmpty={data?.data && isAuth ? false : true}>
      {isAuth ? (
        <AuthFavoriteEmpty isLoading={isLoading} data={data?.data} />
      ) : (
        <NotAuthFavorite />
      )}
    </Layout>
  );
};

export default Favorites;
