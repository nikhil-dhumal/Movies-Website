import { Box, Button, ButtonGroup, Grid, Stack, useScrollTrigger } from "@mui/material";
import MediaItem from "../components/common/MediaItem";
import { useState, cloneElement, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import usePrevious from "../hooks/usePrevious";
import GenresSelect from "../components/common/GenresSelect";
import { useDispatch, useSelector } from "react-redux";
import { themeModes } from "../configs/theme.configs";
import genreApi from "../api/modules/genre.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";
import MediaGrid from "../components/common/MediaGrid";

const GenereList = () => {
  const { genres } = useSelector((state) => state.genres);
  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [mediaType, setMediaType] = useState(tmdbConfigs.mediaType.movie);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const prevMediaType = usePrevious(mediaType);
  const prevGenre = usePrevious(selectedGenre);
  const dispatch = useDispatch()

  const onLoadMore = () => setCurrPage(currPage + 1);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [mediaType, selectedGenre])

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true))
      setMediaLoading(true)

      const { response, err } = await genreApi.getMediasList({
        mediaType,
        genre: genres[mediaType][selectedGenre].id,
        page: currPage
      })

      setMediaLoading(false)
      dispatch(setGlobalLoading(false))

      if (err) toast.error(err.message)
      if (response) {
        if (currPage !== 1) setMedias(m => [...m, ...response.results])
        else setMedias([...response.results])
      }
    }

    if (mediaType !== prevMediaType) {
      setSelectedGenre()
      setMedias([])
      setCurrPage(1)
    }

    if (selectedGenre !== prevGenre) {
      setMedias([])
      setCurrPage(1)
    }

    if (selectedGenre) getMedias()
  }, [
    mediaType,
    selectedGenre,
    prevMediaType,
    currPage,
    dispatch
  ])

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Box
        sx={{
          p: 2,
          px: 12,
          mt: { sm: "10% !important", sm: "8% !important", lg: "3.1% !important" },
          position: "fixed",
          width: "100%",
          left: "0",
          zIndex: 100,
          backgroundColor: "background.paper"
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <GenresSelect mediaType={mediaType} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
          <ButtonGroup>
            <Button
              size="large"
              variant={mediaType === tmdbConfigs.mediaType.movie ? "contained" : "text"}
              sx={{
                color: mediaType === tmdbConfigs.mediaType.movie ? "primary.contrastText" : "text.primary"
              }}
              onClick={() => setMediaType(tmdbConfigs.mediaType.movie)}
            >
              {tmdbConfigs.mediaType.movie}
            </Button>
            <Button
              size="large"
              variant={mediaType === tmdbConfigs.mediaType.tv ? "contained" : "text"}
              sx={{
                color: mediaType === tmdbConfigs.mediaType.tv ? "primary.contrastText" : "text.primary"
              }}
              onClick={() => setMediaType(tmdbConfigs.mediaType.tv)}
            >
              {tmdbConfigs.mediaType.tv}
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
      <Box
        sx={{
          mt: 20
        }}
      >
        <MediaGrid medias={medias} mediaType={mediaType} />
        {
          medias.length !== 0 && <LoadingButton
            sx={{ marginTop: 10 }}
            fullWidth
            color="primary"
            loading={mediaLoading}
            onClick={onLoadMore}
          >
            load more
          </LoadingButton>
        }
      </Box>
    </Box>
  );
};

export default GenereList;
