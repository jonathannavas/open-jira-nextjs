import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { UIContext } from '../../context/ui'

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext)

  const router = useRouter()

  const handleRedirect = () => {
    router.push('/')
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <Typography variant="h6" onClick={handleRedirect}>
          OpenJira
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
