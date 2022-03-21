import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/images/logo-movie.png';
import User from '../../../assets/images/user.png';
import {
  logout,
  selectUser,
} from '../../Auth/authSlice';

const pages = [
  {
    title: 'Cụm Rạp',
    url: '',
  },

  {
    title: 'Tin Tức',
    url: '#',
  },
];

// const handleUser = () => {
//   const user = useSelector(selectUser);
// };

const Header = () => {
  const role = useSelector(state => state.auth.role)
  const user = useSelector((state => state.auth.currentUser))

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');

  };
  const handleAdmin = () => {
    console.log('admin click');
  };
  const profile = () => {
    navigate(`/profile/${user.taiKhoan}`);
  };
  const settings = [
    role !== 'KhachVangLai' ? { name: 'Cá Nhân', handleClick: profile } : {},
    { name: (role !== 'KhachVangLai' ? 'Đăng xuât' : 'Đăng Nhập'), handleClick: handleLogout },
  ];
  // const settingAdmin = [
  //   { name: 'Cá Nhân' },
  //   { name: 'Quản Trị', handleClick: handleAdmin },
  //   { name: 'Đăng xuât', handleClick: handleLogout },
  // ];
  const scrollToFooter = () => {
    window.scrollTo({
      top: 500000,
      behavior: 'smooth',
    });
  };
  const dispatch = useDispatch();

  // const user = useSelector((state) => state.auth.currentUser);

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: '#fff',
        color: 'black',
        position: 'sticky',
        top: '0',
        opacity: '0.85',
        zIndex: 99999999,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to={`/`}>
              <img style={{ width: '60px' }} src={Logo} />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Link key={page.url} to={`/${page.url}`}>
                    <Typography textAlign="center" style={{ color: 'black' }}>{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem key={'Liên lạc'} onClick={handleCloseNavMenu}>
                <Typography textAlign="center" onClick={() => scrollToFooter()}>Liên Lạc</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img style={{ width: '50px' }} src={Logo} />
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {pages.map((page) => (
              <Link key={page.url} to={`/${page.url}`}>
                <Button
                  key={page.title}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'black',
                    display: 'block',
                    marginLeft: '30px',
                  }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
            <Button
              key={'Liên Lạc'}
              onClick={() => scrollToFooter()}
              sx={{
                my: 2,
                color: 'black',
                display: 'block',
                marginLeft: '30px',
              }}
            >
              {'liên lạc'}
            </Button>
          </Box>



          <Box sx={{ flexGrow: 0 }}>
            Hi, {user.taiKhoan || ""}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src={User} style={{boder:"1px"}}  /> */}
                <img style={{ width: '30px', border: '2px' }} src={User} />
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
              {
                settings.map((setting) => <MenuItem key={setting} onClick={setting.handleClick}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
                )
              }
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting.handleClick}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))} */}
            </Menu >
          </Box >
        </Toolbar >
      </Container >
    </AppBar >
  );
};
export default Header;
