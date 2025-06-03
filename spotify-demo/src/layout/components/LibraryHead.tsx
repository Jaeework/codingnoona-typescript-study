import { Add, Bookmark } from '@mui/icons-material'
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
                <Bookmark />
                <Typography variant="h2" fontWeight={700}>
                    Your Library
                </Typography>
                <Button>
                    <Add color="primary" />
                </Button>
            </Box>
        </Head>
    )
}

export default LibraryHead
