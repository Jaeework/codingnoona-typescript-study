import { Add, VideoLibraryOutlined } from '@mui/icons-material'
import { Box, Button, styled, Typography } from '@mui/material'
import useCreatePlaylist from '../../hooks/useCreatePlaylist'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import { getSpotifyAuthUrl } from '../../utils/auth'

const Head = styled("div")({
    display: "flex",
    alignItems: "center",
    padding: "8px",
    justifyContent: "space-between",
})

const LibraryHead = () => {
    const { mutate: createPlaylist } = useCreatePlaylist()
    const { data: userProfile } = useGetCurrentUserProfile();
    const handleCreatePlaylist = () => {
        if (userProfile) {
            createPlaylist({
                name: "나의 플레이리스트",
            });
        } else {
            getSpotifyAuthUrl();
        }
    }

    return (
        <Head>
            <Box display="flex" gap={2} alignItems="center">
                <VideoLibraryOutlined />
                <Typography variant="h2" fontWeight={600}>
                    My Library
                </Typography>
                <Button onClick={handleCreatePlaylist}>
                    <Add color="primary" />
                </Button>
            </Box>
        </Head>
    )
}

export default LibraryHead
