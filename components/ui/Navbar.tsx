import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"

export const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start">
          <MenuOutlinedIcon />
        </IconButton>
        <Typography variant="h6">OpenJira</Typography>
      </Toolbar>
    </AppBar>
  )
}
