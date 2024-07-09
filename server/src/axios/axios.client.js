import axios from "axios"

/**
 * Sends a GET request to the specified URL and retrieves JSON data.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} - A promise resolving to the JSON data returned by the server.
 */
const get = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "identity"
      }
    })
    return response.data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error // Propagate the error further if needed
  }
}

export default { get }