import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Box, Button, ButtonGroup, Chip, Divider, Stack, Typography, useTheme } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import WhatshotIcon from "@mui/icons-material/Whatshot"

import mediaApi from "../../api/modules/media.api"

import CircularRate from "./CircularRate"

import uiConfigs from "../../configs/ui.configs"
import tmdbConfigs from "../../api/configs/tmdb.configs"

import { setGlobalLoading } from "../../redux/features/globalLoadingSlice"

import { routesGen } from "../../routes/routes"

const HeroSlide = () => {
  const theme = useTheme()

  const dispatch = useDispatch()

  const { genres } = useSelector((state) => state.genres)

  const [medias, setmedias] = useState([])
  const [timeWidth, setTimeWidth] = useState("day")

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }

    return array
  }

  useEffect(() => {
    const getMedias = async () => {
      const { response: movieResponse, err: movieErr } = await mediaApi.getTrendingList({
        mediaType: tmdbConfigs.mediaType.movie,
        timeWindow: timeWidth
      })

      const { response: tvResponse, err: tvErr } = await mediaApi.getTrendingList({
        mediaType: tmdbConfigs.mediaType.tv,
        timeWindow: timeWidth
      })

      if (movieResponse && tvResponse) {
        const combinedMedias = [...movieResponse.results, ...tvResponse.results]
        const shuffledMedias = shuffleArray(combinedMedias)
        setmedias(shuffledMedias)
      }

      if (movieErr) toast.error(movieErr.message)
      if (tvErr) toast.error(tvErr.message)

      dispatch(setGlobalLoading(false))
    }

    getMedias()
  }, [dispatch, timeWidth])

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
      <Box
        flexGrow={1}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          position: "absolute",
          right: "1%",
          bottom: "5%",
          zIndex: 100,
          color: "text.primary"
        }}
      >
        <WhatshotIcon />
        Trending
        <ButtonGroup variant="contained">
          <Button
            onClick={() => setTimeWidth("day")}
            variant={timeWidth === "day" ? "contained" : "text"}
            sx={{ color: "inherit" }}
          >
            Today
          </Button>
          <Button
            onClick={() => setTimeWidth("week")}
            variant={timeWidth === "week" ? "contained" : "text"}
            sx={{ color: "inherit" }}
          >
            Week
          </Button>
        </ButtonGroup>
      </Box>
      <Swiper
        grabCursor={true}
        modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
      >
        {
          medias?.map((media, index) => (
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
                      {[...media.genre_ids].splice(0, 2)?.map((genreId, index) => (
                        <Chip
                          variant="filled"
                          color="primary"
                          key={index}
                          label={genres[media.media_type].find(e => e.id === genreId) && genres[media.media_type].find(e => e.id === genreId).name}
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
                      to={routesGen.mediaDetail(media.media_type, media.id)}
                      sx={{ width: "max-content" }}
                    >
                      watch now
                    </Button>
                    {/* buttons */}
                  </Stack>
                </Box>
              </Box>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </Box>
  )
}

export default HeroSlide