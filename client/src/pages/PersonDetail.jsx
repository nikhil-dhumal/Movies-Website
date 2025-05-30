import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

import { Box, Toolbar, Typography, Stack } from "@mui/material"

import personApi from "../api/modules/person.api"

import Container from "../components/common/Container"
import PersonMediaGrid from "../components/common/PersonMediaGrid"

import tmdbConfigs from "../api/configs/tmdb.configs"
import uiConfigs from "../configs/ui.configs"

import { setGlobalLoading } from "../redux/features/globalLoadingSlice"

const PersonDetail = () => {
  const dispatch = useDispatch()

  const { personId } = useParams()

  const [person, setPerson] = useState()

  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true))
      const { response, err } = await personApi.detail({ personId })
      dispatch(setGlobalLoading(false))

      if (err) toast.error(err.message)
      if (response) setPerson(response)
    }

    getPerson()
  }, [personId])

  return (
    <>
      <Toolbar />
      {
        person && (
          <>
            <Box sx={{ ...uiConfigs.style.mainContent, mb: 2 }}>
              <Box sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: "row" }
              }}>
                <Box sx={{
                  width: { xs: "50%", md: "20%" }
                }}>
                  <Box sx={{
                    pt: "160%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "darkgrey",
                    backgroundImage: `url(${tmdbConfigs.posterPath(person.profile_path)})`
                  }} />
                </Box>
                <Box sx={{
                  width: { xs: "100%", md: "80%" },
                  p: { xs: "1rem 0", md: "1rem 2rem" }
                }}>
                  <Stack spacing={2}>
                    <Typography variant="h5" fontWeight="700">
                      {`${person.name} (${person.birthday && person.birthday.split("-")[0]}`}
                      {person.deathday && ` - ${person.deathday && person.deathday.split("-")[0]}`}
                      {")"}
                    </Typography>
                    <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>
                      {person.biography}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
              <Container header="medias">
                <PersonMediaGrid personId={personId} />
              </Container>
            </Box>
          </>
        )
      }
    </>
  )
}

export default PersonDetail