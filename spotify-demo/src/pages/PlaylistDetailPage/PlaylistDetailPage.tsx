import React, { useEffect } from 'react'
import useGetPlaylist from '../../hooks/useGetPlaylist'
import { Navigate, useParams } from 'react-router'
import PlaylistDetailHeader from './components/PlaylistDetailHeader';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import { Box, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DesktopPlaylistItem from './components/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import { useInView } from 'react-intersection-observer';
import ErrorMessage from '../../common/components/ErrorMessage';
import LoginButton from '../../common/components/LoginButton';
import EmptyPlaylistWithSearch from './components/EmptyPlaylistWithSearch';
import { AxiosError } from 'axios';

const DetailPageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  height: "calc(100vh - 120px)",
})

const PlaylistContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",

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
  if (error || playlistItemsError) {
    if (error instanceof AxiosError || playlistItemsError instanceof AxiosError) {
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
            로그인이 필요한 페이지입니다.
          </Typography>
          <LoginButton />
        </Box>
      );
    }
    return <ErrorMessage errorMessage="Fail to load playlist" />
  }

  return (
    <DetailPageContainer>

      <PlaylistDetailHeader playlist={playlist} />
      {playlist?.tracks?.total === 0
        ? <EmptyPlaylistWithSearch />
        : <PlaylistContainer>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" }, width: "60px", }}>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell sx={{
                  display: { xs: "none", md: "table-cell" }
                }}>Album</TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell", width: "120px" } }}>Date Added</TableCell>
                <TableCell sx={{width: "80px"}}>Duration</TableCell>
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
            </TableBody>
          </Table>
          {hasNextPage &&
            <div ref={ref} style={{ height: "5px" }}>
              {isFetchingNextPage && <LoadingSpinner />}
            </div>}
        </PlaylistContainer>
      }
    </DetailPageContainer>
  )
}

export default PlaylistDetailPage
