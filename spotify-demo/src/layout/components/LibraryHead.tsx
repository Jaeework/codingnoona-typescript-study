import { Add, VideoLibraryOutlined } from '@mui/icons-material'
import { Box, Button, styled, Typography } from '@mui/material'

const Head = styled("div")({
    display: "flex",
    alignItems: "center",
    padding: "8px",
    justifyContent: "space-between",
})

const LibraryHead = () => {
    return (
        <Head>
            <Box display="flex" gap={2} alignItems="center">
                <VideoLibraryOutlined />
                <Typography variant="h2" fontWeight={600}>
                    My Library
                </Typography>
                <Button>
                    <Add color="primary" />
                </Button>
            </Box>
        </Head>
    )
}

export default LibraryHead
