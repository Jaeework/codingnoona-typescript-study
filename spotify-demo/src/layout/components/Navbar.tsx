import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material'
import LoginButton from '../../common/components/LoginButton'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import { useState } from 'react';
import { logout } from '../../apis/authApi';

const Navbar = () => {
  const {data: userProfile} = useGetCurrentUserProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <Box sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "64px",
    }}>
      {userProfile
      ? <>
      <IconButton onClick={handleClick}>
      <Avatar 
          src={userProfile?.images?.[0]?.url} 
          alt={userProfile?.display_name || "User Profile"} 
          sizes="small" > {userProfile?.display_name?.[0].toUpperCase()} 
          </Avatar>
          </IconButton>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu></>
      : <LoginButton />
      }
    </Box>
  )
}

export default Navbar
