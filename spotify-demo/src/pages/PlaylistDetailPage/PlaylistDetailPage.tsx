import React, { useEffect } from 'react'
import useGetPlaylist from '../../hooks/useGetPlaylist'
import { Navigate, useParams } from 'react-router'
import PlaylistDetailHeader from './components/PlaylistDetailHeader';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import { Box, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import DesktopPlaylistItem from './components/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import { useInView } from 'react-intersection-observer';
import ErrorMessage from '../../common/components/ErrorMessage';
import LoginButton from '../../common/components/LoginButton';

const PlaylistContainer = styled("div")(({ theme }) => ({
  height: "100%",
  overflowY: "auto",
  maxHeight: "calc(100vh - 450px)",

  "&::-webkit-scrollbar": {
    width: "12px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "transparent",
    borderRadius: "0px",
    border: "2px solid transparent",
    transition: "backgroundColor 0.2s ease",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  }

}));

const IndexTableCell = styled(TableCell)({
  width: "60px", // # 컬럼
});

const TitleTableCell = styled(TableCell)({
  width: "40%", // Title 컬럼
});

const AlbumTableCell = styled(TableCell)({
  width: "30%", // Album 컬럼
});

const DateTableCell = styled(TableCell)({
  width: "120px", // Date Added 컬럼
});

const DurationTableCell = styled(TableCell)({
  width: "80px", // Duration 컬럼
});

const PlaylistDetailPage = () => {
  const { ref, inView } = useInView();
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return <Navigate to="/" />;
  const { data: playlist, isLoading: isPlaylistLoading, error } = useGetPlaylist({ playlist_id: id });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage 
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT });
  
  console.log('playlist', playlist);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  })

  if (isPlaylistLoading || isPlaylistItemsLoading) return <LoadingSpinner />
  if (playlistItemsError) {
    if(playlistItemsError?.status === 401) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" fontWeight={500} mb={2}>
            다시 로그인 하세요
          </Typography>
          <LoginButton />
        </Box>
      );
    }
    return <ErrorMessage errorMessage="Fail to load playlist" />
  } 

  return (
    <div>
      <PlaylistDetailHeader playlist={playlist} />
      {playlist?.tracks?.total === 0
        ? <Typography>써치</Typography>
        : <PlaylistContainer>
            <Table sx={{ tableLayout: "fixed", width: "100%",}}>
              <TableHead>
                <TableRow>
                  <IndexTableCell>#</IndexTableCell>
                  <TitleTableCell>Title</TitleTableCell>
                  <AlbumTableCell>Album</AlbumTableCell>
                  <DateTableCell>Date Added</DateTableCell>
                  <DurationTableCell>Duration</DurationTableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                  {playlistItems?.pages.map((page, pageIndex) => page.items.map((item, itemIndex) => {
                    return (
                      <DesktopPlaylistItem
                        item={item}
                        key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                        index={pageIndex * PAGE_LIMIT + itemIndex + 1} />)
                  }))}
                  <TableRow ref={ref} style={{ height: "5px"}}>
                      {isFetchingNextPage && <LoadingSpinner />}
                  </TableRow>
                </TableBody>
            </Table>
          </PlaylistContainer>

      }
    </div>
  )
}

export default PlaylistDetailPage
