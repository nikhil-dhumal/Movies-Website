import React from 'react'
import HeroTrendingSlide from '../components/common/HeroTrendingSlide'
import tmdbConfigs from "../api/configs/tmdb.configs"
import { Box } from '@mui/material'
import uiConfigs from "../configs/ui.configs"
import Container from "../components/common/Container"
import MediaSlide from "../components/common/MediaSlide"

const HomePage = () => {
  return (
    <>
      <HeroTrendingSlide/>

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
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