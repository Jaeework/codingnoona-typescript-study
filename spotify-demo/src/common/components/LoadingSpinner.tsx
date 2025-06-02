import { Box, CircularProgress } from '@mui/material'

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="200px"
    >
      <CircularProgress size={40} color="primary" />
    </Box>
  )
}

export default LoadingSpinner
