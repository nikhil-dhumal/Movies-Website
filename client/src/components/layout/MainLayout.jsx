import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import Footer from "../common/Footer"
import GlobalLoading from "../common/GlobalLoading"
import Topbar from "../common/Topbar"
import AuthModal from "../common/AuthModal"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { toast } from "react-toastify"
import userApi from "../../api/modules/user.api"
import favoriteApi from "../../api/modules/favorite.api"
import genreApi from "../../api/modules/genre.api"
import { setListFavorites, setUser } from "../../redux/features/userSlice"
import { setgenres } from "../../redux/features/genresSlice"
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice"

const MainLayout = () => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  const { globalLoading } = useSelector((state) => state.globalLoading)

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo()

      if (response) dispatch(setUser(response))
      if (err) dispatch(setUser(null))
    }

    const getGenres = async () => {
      dispatch(setGlobalLoading(true))
      const { response, err } = await genreApi.getList()

      if (response) dispatch(setgenres(response))
      if (err) {
        toast.error(err.message)
        setGlobalLoading(false)
      }
    }

    authUser()
    getGenres()
  }, [dispatch])

  useEffect(() => {
    const getFavorites = async () => {
      const { response, err } = await favoriteApi.getList()

      if (response) dispatch(setListFavorites(response))
      if (err) toast.error(err.message)
    }

    if (user) getFavorites()
    if (!user) dispatch(setListFavorites([]))
  }, [user, dispatch])

  return (
    <>
      {/* global loading */}
      <GlobalLoading />
      {/* global loading */}

      {/* login modal */}
      <AuthModal />
      {/* login modal */}

      <Box display="flex" minHeight="100vh">
        {/* header */}
        <Topbar />
        {/* header */}

        {/* main */}
        <Box
          component="main"
          flexGrow={1}
          overflow="hidden"
          minHeight="100vh"
        >
          <Outlet />
        </Box>
        {/* main */}
      </Box>

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  )
}

export default MainLayout