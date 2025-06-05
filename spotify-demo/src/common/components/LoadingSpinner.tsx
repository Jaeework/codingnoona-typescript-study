import { Box, CircularProgress } from '@mui/material'

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <CircularProgress size={40} color="primary" />
    </Box>
  )
}

export default LoadingSpinner
