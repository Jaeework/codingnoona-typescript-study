import { Box, Grid, styled, Typography } from '@mui/material'
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import React from 'react'
import { Playlist } from '../../../models/playlist';

interface PlaylistHeaderProps {
    playlist: Playlist
}

const PlaylistHeader = styled(Grid)({
    display: "flex",
    alignItems: "flex-end",
    background: "linear-gradient(180deg, rgba(64, 64, 64, 1) 0%, rgba(32, 32, 32, 1) 100%)",
    padding: "16px",
});

const ImageGrid = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
    },
}));

const PlaylistImage = styled("img")(({ theme }) => ({
    borderRadius: "4px",
    width: "100%",
    maxWidth: "300px",
    aspectRatio: "1",
    display: "block",

    [theme.breakpoints.down("md")]: {
        maxWidth: "200px",
    },
}));

const DefaultImage = styled(Box)(({theme}) => ({
    backgroundColor: "#333",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "300px",
    aspectRatio: "1",

    [theme.breakpoints.down("md")]: {
        maxWidth: "200px",
    },
}));

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
    fontSize: "3rem",
    textAlign: "left",

    [theme.breakpoints.down("md")]: {
        fontSize: "1rem",
    },
}));

const OwnerImage = styled("img")({
    width: "20px",
    height: "20px",
    borderRadius: "50%",
});

const PlaylistDetailHeader = ({
    playlist
}: PlaylistHeaderProps) => {
  return (
    <PlaylistHeader container spacing={7}>
        <ImageGrid item sm={12} md={2}>
          {playlist?.images ? (
            <PlaylistImage
              src={playlist?.images[0].url}
              alt={playlist?.name}
            />
          ) : (
            <DefaultImage>
              <MusicNoteIcon fontSize="large" />
            </DefaultImage>
          )}
        </ImageGrid>
        <Grid item sm={12} md={10}>
          <Box>
            <ResponsiveTypography variant="h1" color="white">
              {playlist?.name}
            </ResponsiveTypography>

            <Box display="flex" alignItems="center" mt={1}>
              <OwnerImage
                src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
              />
              <Typography
                variant="body2"
                color="white"
                ml={1}
                fontWeight={700}
              >
                {playlist?.owner?.display_name
                  ? playlist?.owner.display_name
                  : "Unknown"}
              </Typography>
              <Typography variant="body2" color="textSecondary" ml={1}>
                • {playlist?.tracks?.total} songs
              </Typography>
            </Box>
          </Box>
        </Grid>
      </PlaylistHeader>
  )
}

export default PlaylistDetailHeader
