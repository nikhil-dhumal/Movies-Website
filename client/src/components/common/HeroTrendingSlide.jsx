import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { toast } from "react-toastify"

import { setGlobalLoading } from "../../redux/features/globalLoadingSlice"
import { routesGen } from "../../routes/routes"

import uiConfigs from "../../configs/ui.configs"

import CircularRate from "./CircularRate"

import tmdbConfigs from "../../api/configs/tmdb.configs"
import genreApi from "../../api/modules/genre.api"
import mediaApi from "../../api/modules/media.api"

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const [medias, setmedias] = useState([])
  const [genres, setGenres] = useState([])
  const [movieGenres, setMovieGenres] = useState([])
  const [tvGenres, setTvGenres] = useState([])

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  useEffect(() => {
    const getMedias = async () => {
      if (mediaType !== undefined) {
        const { response, err } = await mediaApi.getList({ mediaType, mediaCategory, page: 1 })

        if (response) setmedias(response.results)
        if (err) toast.error(err.message)

        dispatch(setGlobalLoading(false))
      }

      const { response: movieResponse, err: movieErr } = await mediaApi.getTrendingList({
        mediaType: tmdbConfigs.mediaType.movie,
        timeWindow: "week"
      })

      const { response: tvResponse, err: tvErr } = await mediaApi.getTrendingList({
        mediaType: tmdbConfigs.mediaType.tv,
        timeWindow: "week"
      })

      if (movieResponse && tvResponse) {
        const combinedMedias = [
          ...movieResponse.results.map(movie => ({...movie, media_type: "movie"})), 
          ...tvResponse.results.map(tv => ({...tv, media_type: "tv"}))
        ]
        const shuffledMedias = shuffleArray(combinedMedias)
        setmedias(shuffledMedias)
      }

      if (movieErr) toast.error(movieErr.message)
      if (tvErr) toast.error(tvErr.message)

      dispatch(setGlobalLoading(false))
    }

    const getGenres = async () => {
      if (mediaType !== undefined) {
        dispatch(setGlobalLoading(true))
        const { response, err } = await genreApi.getList({ mediaType })

        if (response) {
          setGenres(response.genres)
          getMedias()
        }

        if (err) {
          toast.error(err.message)
          setGlobalLoading(false)
        }
      }

      dispatch(setGlobalLoading(true))
      const { response: movieResponse, err: movieErr } = await genreApi.getList({ mediaType: tmdbConfigs.mediaType.movie })
      const { response: tvResponse, err: tvErr } = await genreApi.getList({ mediaType: tmdbConfigs.mediaType.tv })

      if (movieResponse && tvResponse) {
        setMovieGenres(movieResponse.genres)
        setTvGenres(tvResponse.genres)
        getMedias()
      }

      if (movieErr) {
        toast.error(movieErr.message)
        setGlobalLoading(false)
      }

      if (tvErr) {
        toast.error(movieErr.message)
        setGlobalLoading(false)
      }
    }

    getGenres()
  }, [dispatch, mediaType, mediaCategory])

  return (
    <Box sx={{
      position: "relative",
      color: "primary.contrastText",
      "&::before": {
        content: '""',
        width: "100%",
        height: "30%",
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2,
        pointerEvents: "none",
        ...uiConfigs.style.gradientBgImage[theme.palette.mode]
      }
    }}>
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
      >
        {medias.map((media, index) => (
          <SwiperSlide key={index}>
            <Box sx={{
              paddingTop: {
                xs: "130%",
                sm: "80%",
                md: "60%",
                lg: "50%"
              },
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)})`
            }} />
            <Box sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode]
            }} />
            <Box sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              paddingX: { sm: "10px", md: "5rem", lg: "10rem" }
            }}>
              <Box sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                paddingX: "30px",
                color: "text.primary",
                width: { sm: "unset", md: "30%", lg: "40%" }
              }}>
                <Stack spacing={4} direction="column">
                  {/* title */}
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                    fontWeight="700"
                    sx={{
                      ...uiConfigs.style.typoLines(2, "left")
                    }}
                  >
                    {media.title || media.name}
                  </Typography>
                  {/* title */}

                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* rating */}
                    <CircularRate value={media.vote_average} />
                    {/* rating */}

                    <Divider orientation="vertical" />
                    {/* genres */}
                    {[...media.genre_ids].splice(0, 2).map((genreId, index) => (
                      <Chip
                        variant="filled"
                        color="primary"
                        key={index}
                        label={
                          mediaType !== undefined
                            ? genres.find(e => e.id == genreId) && genres.find(e => e.id === genreId).name
                            : media.media_type === "movie"
                              ? movieGenres.find(e => e.id === genreId) && movieGenres.find(e => e.id === genreId).name
                              : tvGenres.find(e => e.id === genreId) && tvGenres.find(e => e.id === genreId).name
                        }
                      />
                    ))}
                    {/* genres */}
                  </Stack>

                  {/* overview */}
                  <Typography variant="body1" sx={{
                    ...uiConfigs.style.typoLines(3)
                  }}>
                    {media.overview}
                  </Typography>
                  {/* overview */}

                  {/* buttons */}
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    to={routesGen.mediaDetail(tmdbConfigs.mediaType.tv, media.id)}
                    sx={{ width: "max-content" }}
                  >
                    watch now
                  </Button>
                  {/* buttons */}
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default HeroSlide