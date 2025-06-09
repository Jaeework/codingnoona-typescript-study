import React from 'react'
import { SimplifiedPlaylist } from '../../models/playlist'
import { Avatar, ListItemAvatar, ListItemButton, ListItemText, styled, Typography } from '@mui/material';

interface PlaylistItemProps {
    playlist: SimplifiedPlaylist;
    handleClick: (id: string) => void;
    selected?: boolean;
}

const PlaylistItemContainer = styled(ListItemButton)(({theme, selected}) => ({
    padding: "8px",
    gap: "2px",
}));

const PlaylistAvatar = styled(Avatar)({
    width: "48px",
    height: "48px",
    borderRadius: "8px",
});

const PlaylistItem = ({ playlist, handleClick, selected }: PlaylistItemProps) => {
  return (
    <PlaylistItemContainer
        onClick={() => handleClick(playlist.id || "")}
        selected={selected || false}
    >
        <ListItemAvatar>
          {playlist.images?.[0] 
          ? <PlaylistAvatar alt={playlist.name} src={playlist.images?.[0].url} /> 
          : <PlaylistAvatar alt="No Image">
                <Typography textAlign="center">No Image</Typography>
            </PlaylistAvatar>}
        </ListItemAvatar>
        <ListItemText
          primary={<Typography color={selected ? "primary" : ""}>
            {playlist.name}
          </Typography>}
          secondary={
              <Typography
                variant="body1"
                color="text.secondary"
              >
                {"Playlist • " + playlist.owner?.display_name}
              </Typography>
          }
        />
    </PlaylistItemContainer>
  )
}

export default PlaylistItem
