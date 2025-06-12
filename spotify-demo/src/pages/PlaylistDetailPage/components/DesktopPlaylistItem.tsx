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
  padding: "20px",
});

const IndexTableCell = styled(TableCellNoUnderline)({
  width: "60px", // # 컬럼
});

const TitleTableCell = styled(TableCellNoUnderline)({
  width: "40%", // Title 컬럼
  // 텍스트가 넘칠 경우 처리
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const AlbumTableCell = styled(TableCellNoUnderline)({
  width: "30%", // Album 컬럼
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const DateTableCell = styled(TableCellNoUnderline)({
  width: "120px", // Date Added 컬럼
});

const DurationTableCell = styled(TableCellNoUnderline)({
  width: "80px", // Duration 컬럼
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
      <IndexTableCell>
        <Typography>
          {index}
        </Typography>
      </IndexTableCell>
      <TitleTableCell>
        <Typography>
          {item.track.name || "no name"}
        </Typography>  
      </TitleTableCell>
      <AlbumTableCell>{isEpisode(item.track) ? "N/A" : item.track.album?.name}</AlbumTableCell>
      <DateTableCell>{item.added_at ? new Date(item.added_at).toISOString().split('T')[0] : "Unknown"}</DateTableCell>
      <DurationTableCell>{item.track.duration_ms ? formatDuration(item.track.duration_ms) : "Unknown"}</DurationTableCell>
    </PlaylistItemRow>
  )
}

export default DesktopPlaylistItem
