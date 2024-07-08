import { Box } from "@mui/material"
import { Swiper } from "swiper/react"
import { Autoplay } from "swiper/modules"

const AutoSwiper = ({ children }) => {
  return (
    <Box sx={{
      "& .swiper-slide": {
        width: {
          xs: "50%",
          sm: "35%",
          md: "25%",
          lg: "20.5%"
        }
      }
    }}>
      <Swiper
        loop={true}
        slidesPerView="auto"
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
      >
        {children}
      </Swiper>
    </Box>
  )
}

export default AutoSwiper