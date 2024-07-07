import React from 'react'
import HeroSlide from '../components/common/HeroSlide'
import tmdbConfigs from "../api/configs/tmdb.configs"
import { Box } from '@mui/material'

const HomePage = () => {
  return (
    <>
      <HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
    </>
  )
}

export default HomePage