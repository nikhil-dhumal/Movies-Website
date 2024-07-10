import { Link } from "react-router-dom"

import { Paper, Stack, Button, Box } from "@mui/material"

import Logo from "./Logo"

import menuConfigs from "../../configs/menu.configs"

const Footer = () => {
  return (
    <Paper square={true} sx={{ backgroundImage: "unset", p: "1rem" }}>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction={{ xs: "column", md: "row " }}
        sx={{ height: "max-content" }}
      >
        <Logo />
        <Box>
          {
            menuConfigs.main?.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "inherit" }}
                component={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))
          }
        </Box>
      </Stack>
    </Paper>
  )
}

export default Footer