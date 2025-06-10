import React from 'react'
import { PlaylistTrack } from '../../../models/playlist';
import { styled, TableCell, TableRow, Typography } from '@mui/material';
import { Episode, Track } from '../../../models/track';

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const PlaylistItemRow = styled(TableRow)(({theme}) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  }
}));

const TableCellNoUnderline = styled(TableCell)({
  border: "none",
  textAlign: "left",
  padding: "15px",
});

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (track:Track | Episode) => {
    return "description" in track ? true : false;
  }

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  return (
    <PlaylistItemRow>
      <TableCellNoUnderline>
        <Typography>
          {index}
        </Typography>
      </TableCellNoUnderline>
      <TableCellNoUnderline>
        <Typography>
          {item.track.name || "no name"}
        </Typography>  
      </TableCellNoUnderline>
      <TableCellNoUnderline>{isEpisode(item.track) ? "N/A" : item.track.album?.name}</TableCellNoUnderline>
      <TableCellNoUnderline>{item.added_at ? new Date(item.added_at).toISOString().split('T')[0] : "Unknown"}</TableCellNoUnderline>
      <TableCellNoUnderline>{item.track.duration_ms ? formatDuration(item.track.duration_ms) : "Unknown"}</TableCellNoUnderline>
    </PlaylistItemRow>
  )
}

export default DesktopPlaylistItem
