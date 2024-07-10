import HomePage from "../pages/HomePage"
import MediaList from "../pages/MediaList"
import GenreList from "../pages/GenereList"
import MediaSearch from "../pages/MediaSearch"
import MediaDetail from "../pages/MediaDetail"
import PersonDetail from "../pages/PersonDetail"
import FavoriteList from "../pages/FavoriteList"
import ReviewList from "../pages/ReviewList"
import PasswordUpdate from "../pages/PasswordUpdate"
import ProtectedPage from "../components/common/ProtectedPage"

export const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  genereList: "/genre",
  mediaSearch: "/search",
  mediaDetail: (type, id) => `/${type}/${id}`,
  person: (id) => `/person/${id}`,
  favoriteList: "/favorites",
  reviewList: "/reviews",
  passwordUpdate: "password-update"
}

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/:mediaType",
    element: <MediaList />
  },
  {
    path: "/genres",
    element: <GenreList />,
    state: "genres"
  },
  {
    path: "/search",
    element: <MediaSearch />,
    state: "search"
  },
  {
    path: "/:mediaType/:mediaId",
    element: <MediaDetail />
  },
  {
    path: "/person/:personId",
    element: <PersonDetail />,
    state: "person.detail"
  },
  {
    path: "/favorites",
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: "favorites"
  },
  {
    path: "/reviews",
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: "reviews"
  },
  {
    path: "/password-update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password.update"
  }
]

export default routes