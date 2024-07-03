'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const settings = ['Create Post','Upload profile photo', 'Change password', 'Logout','Login','Register'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // let dispatch = useDispatch();
  let {allPosts,userPhoto,isLoading,isError} = useSelector((state:any)=>state.posts);

  const router = useRouter()
  // const [apiError, setApiError] = React.useState<string>('');
  let headers = { token:localStorage.getItem('userToken')};
   async function LogOut( ) {
     let response = await axios.get('https://linked-posts.routemisr.com/users/profile-data',{headers})
     try{
      if(response?.data?.message === 'success')
        {
          localStorage.removeItem('userToken');
          console.log(response?.data)
          router.push('/signin');
        }
     }
     catch(error:any)
     {
      console.log(error);
     };
    
   };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{justifyContent:'space-between', alignItems:'center'}}>
          <Box sx={{display:'flex', alignItems:'center'}}>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Facebook
          </Typography>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Facebook
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={userPhoto} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
              <Button href='/createpost'>
                  <Typography textAlign="center">{settings[0]}</Typography>
                  </Button>
                </MenuItem>
                
                <MenuItem onClick={handleCloseUserMenu}>
                <Button href='/uploadphoto'>
                  {settings[1]}
                  </Button>
                </MenuItem>
                
                <MenuItem onClick={handleCloseUserMenu}>
                <Button href='/changepassword'>
                  <Typography textAlign="center">{settings[2]}</Typography>
                  </Button>
                </MenuItem>
                {localStorage.getItem('userToken')!==null?<MenuItem onClick={handleCloseUserMenu}>
                <Button onClick={LogOut} href='#'>
                  <Typography textAlign="center">{settings[3]}</Typography>
                  </Button>
                </MenuItem>:<Box><MenuItem onClick={handleCloseUserMenu}>
                <Button href='/signin'>
                  <Typography textAlign="center">{settings[4]}</Typography>
                  </Button>
                </MenuItem><MenuItem onClick={handleCloseUserMenu}>
                <Button href='/signup'>
                  <Typography textAlign="center">{settings[5]}</Typography>
                  </Button>
                </MenuItem></Box>}
                
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;