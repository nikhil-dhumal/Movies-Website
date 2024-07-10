import React from "react"

import { Box } from "@mui/material"

import Container from "../components/common/Container"
import HeroTrendingSlide from "../components/common/HeroTrendingSlide"
import MediaSlide from "../components/common/MediaSlide"

import tmdbConfigs from "../api/configs/tmdb.configs"
import uiConfigs from "../configs/ui.configs"

const HomePage = () => {
  return (
    <>
      <HeroTrendingSlide />
      <Box sx={{ ...uiConfigs.style.mainContent, mt: "-4rem !important" }}>
        {[
          { header: "popular movies", mediaType: tmdbConfigs.mediaType.movie, mediaCategory: tmdbConfigs.movieCategory.popular },
          { header: "popular series", mediaType: tmdbConfigs.mediaType.tv, mediaCategory: tmdbConfigs.tvCategory.popular },
          { header: "top rated movies", mediaType: tmdbConfigs.mediaType.movie, mediaCategory: tmdbConfigs.movieCategory.top_rated },
          { header: "top rated series", mediaType: tmdbConfigs.mediaType.tv, mediaCategory: tmdbConfigs.tvCategory.top_rated },
          { header: "now playing movies", mediaType: tmdbConfigs.mediaType.movie, mediaCategory: tmdbConfigs.movieCategory.now_playing },
          { header: "on the air series", mediaType: tmdbConfigs.mediaType.tv, mediaCategory: tmdbConfigs.tvCategory.on_the_air },
          { header: "upcoming movies", mediaType: tmdbConfigs.mediaType.movie, mediaCategory: tmdbConfigs.movieCategory.upcoming },
          { header: "airing today series", mediaType: tmdbConfigs.mediaType.tv, mediaCategory: tmdbConfigs.tvCategory.airing_today },
        ].map((section, index) => (
          <Container
            key={index}
            header={section.header}
          >
            <MediaSlide mediaType={section.mediaType} mediaCategory={section.mediaCategory} />
          </Container>
        ))}
      </Box>
    </>
  )
}

export default HomePage