import { useEffect, useRef } from "react"
import { SwiperSlide } from "swiper/react"

import { Box } from "@mui/material"

import NavigationSwiper from "./NavigationSwiper"

import tmdbConfigs from "../../api/configs/tmdb.configs"

const MediaVideo = ({ video }) => {
  const iframeRef = useRef()

  useEffect(() => {
    const height = iframeRef.current.offsetWidth * 9 / 16 + "px"
    iframeRef.current.setAttribute("height", height)
  }, [video])

  return (
    <Box sx={{ height: "max-content" }}>
      <iframe
        key={video.key}
        src={tmdbConfigs.youtubePath(video.key)}
        ref={iframeRef}
        width="100%"
        title={video.id}
        style={{ border: 0 }}
      ></iframe>
    </Box>
  )
}

const MediaVideosSlide = ({ videos }) => {
  return (
    <NavigationSwiper>
      {
        videos?.map((video, index) => (
          <SwiperSlide key={index}>
            <MediaVideo video={video} />
          </SwiperSlide>
        ))
      }
    </NavigationSwiper>
  )
}

export default MediaVideosSlide