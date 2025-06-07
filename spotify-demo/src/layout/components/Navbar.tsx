import { Avatar, Box } from '@mui/material'
import LoginButton from '../../common/components/LoginButton'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import { useState } from 'react';

const Navbar = () => {
  const {data: userProfile} = useGetCurrentUserProfile();

  return (
    <Box sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "64px",
    }}>
      {userProfile
      ? <Avatar 
          src={userProfile?.images?.[0]?.url} 
          alt={userProfile?.display_name || "User Profile"} 
          sizes="small" > {userProfile?.display_name?.[0].toUpperCase()} </Avatar>
      : <LoginButton />
      }
    </Box>
  )
}

export default Navbar
