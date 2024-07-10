import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"

import mediaApi from "../../api/modules/media.api"

import CircularRate from "./CircularRate"

import uiConfigs from "../../configs/ui.configs"
import tmdbConfigs from "../../api/configs/tmdb.configs"

import { setGlobalLoading } from "../../redux/features/globalLoadingSlice"

import { routesGen } from "../../routes/routes"

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme()

  const dispatch = useDispatch()

  const { genres } = useSelector((state) => state.genres)

  const [medias, setmedias] = useState([])

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({ mediaType, mediaCategory, page: 1 })

      if (response) setmedias(response.results)
      if (err) toast.error(err.message)

      dispatch(setGlobalLoading(false))
    }

    getMedias()
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
                px: { sm: "10px", md: "5rem", lg: "10rem" }
              }}>
                <Box sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  px: "30px",
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
                          label={genres[mediaType].find(e => e.id == genreId) && genres[mediaType].find(e => e.id === genreId).name}
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
          ))
        }
      </Swiper>
    </Box>
  )
}

export default HeroSlide