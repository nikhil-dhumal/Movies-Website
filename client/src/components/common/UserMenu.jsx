import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import { ListItemButton, ListItemIcon, ListItemText, Menu, Typography, Stack } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import menuConfigs from "../../configs/menu.configs"
import { setUser } from "../../redux/features/userSlice"
import TextAvatar from "./TextAvatar"

const UserMenu = () => {
  const { user } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)

  const toggleMenu = (e) => setAnchorEl(e.currentTarget)

  const capitalize = (name) => {
    return name[0].toUpperCase() + name.slice(1)
  }

  return (
    <>
      {user && (
        <>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={toggleMenu}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <TextAvatar text={user.displayName} />
              {capitalize(user.displayName)}
            </Stack>
          </Typography>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={index}
                onClick={() => setAnchorEl(null)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText disableTypography primary={
                  <Typography textTransform="uppercase">{item.display}</Typography>
                } />
              </ListItemButton>
            ))}
            <ListItemButton
              sx={{ borderRadius: "10px" }}
              onClick={() => dispatch(setUser(null))}
            >
              <ListItemIcon><LogoutOutlinedIcon /></ListItemIcon>
              <ListItemText disableTypography primary={
                <Typography textTransform="uppercase">sign out</Typography>
              } />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  )
}

export default UserMenu