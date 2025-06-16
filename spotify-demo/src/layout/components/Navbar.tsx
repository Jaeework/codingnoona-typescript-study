import { Avatar, Box, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material'
import LoginButton from '../../common/components/LoginButton'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import { useState } from 'react';
import { logout } from '../../apis/authApi';
import { useLocation } from 'react-router';

const Navbar = () => {
  const location = useLocation();
  const isSearch = location.pathname === "/search";
  const [keyword, setKeyword] = useState<string>("");
  const { data: userProfile } = useGetCurrentUserProfile();
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
  const handleSearchKeyword= (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "64px",
    }}>
      <Box>
        {isSearch
          ? (
            <div>
              <TextField
                placeholder="What do you want to play?"
                value={keyword}
                onChange={handleSearchKeyword} />
            </div>
          ) : ""}
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        // // height: "64px",
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
    </Box>
  )
}

export default Navbar
