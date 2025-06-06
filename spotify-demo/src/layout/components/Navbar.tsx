import { Avatar, Box } from '@mui/material'
import LoginButton from '../../common/components/LoginButton'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'

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
      ? <Avatar src={userProfile?.images?.[0]?.url} alt={userProfile?.display_name || "User Profile"} />
      : <LoginButton />
      }
    </Box>
  )
}

export default Navbar
