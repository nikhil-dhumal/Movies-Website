import publicClient from "../client/public.client"

const genreEndpoints = {
  list: '/genres/list',
  mediasList: ({ mediaType, genre, page }) => `/genres/${mediaType}?with_genres=${genre}&page=${page}`
}

const genreApi = {
  getList: async () => {
    try {
      const response = await publicClient.get(genreEndpoints.list)

      return { response }
    } catch (err) { return { err } }
  },
  getMediasList: async ({ mediaType, genre, page }) => {
    try {
      const response = await publicClient.get(genreEndpoints.mediasList({ mediaType, genre, page }))

      return { response }
    } catch (err) { return { err } }
  }
}

export default genreApi