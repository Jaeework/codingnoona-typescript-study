import React, { useEffect } from 'react'
import EmptyPlaylist from './EmptyPlaylist'
import Playlist from './Playlist';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import { styled } from '@mui/material';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import ErrorMessage from '../../common/components/ErrorMessage';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import { useInView } from 'react-intersection-observer';

const PlaylistContainer = styled("div")(({ theme }) => ({
  height: "100%",
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  }
}));

const Library = () => {
  const { ref, inView } = useInView();
  const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
  const { data: user } = useGetCurrentUserProfile();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  })

  if (!user) return <EmptyPlaylist />
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />

  return (
    <div>
      {!data || data?.pages[0].total === 0
        ? (<EmptyPlaylist />)
        :
        (
          <PlaylistContainer>
            {data?.pages.map((page, index) => (
              <Playlist playlists={page.items} key={index} />
            ))}
            <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>
          </PlaylistContainer>
        )
      }

    </div>
  )
}

export default Library
