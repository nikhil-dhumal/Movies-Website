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
        <Container header="popular movies">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.movieCategory.popular} />
        </Container>

        <Container header="popular series">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.tvCategory.popular} />
        </Container>

        <Container header="top rated movies">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.movieCategory.top_rated} />
        </Container>

        <Container header="top rated series">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.tvCategory.top_rated} />
        </Container>

        <Container header="now playing movies">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.movieCategory.now_playing} />
        </Container>

        <Container header="on the air series">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.tvCategory.on_the_air} />
        </Container>

        <Container header="upcoming movies">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.movieCategory.upcoming} />
        </Container>

        <Container header="airing today series">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.tvCategory.airing_today} />
        </Container>
      </Box>
    </>
  )
}

export default HomePage