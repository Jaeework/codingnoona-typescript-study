import React, { useEffect } from 'react'
import EmptyPlaylist from './EmptyPlaylist'
import Playlist from './Playlist';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import { styled } from '@mui/material';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import ErrorMessage from '../../common/components/ErrorMessage';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import { useInView } from 'react-intersection-observer';
import { AxiosError } from 'axios';

const PlaylistContainer = styled("div")({
  height: "100%",
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",

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
});

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
  if (error) {
    if(error instanceof AxiosError) return <EmptyPlaylist /> 
    return <ErrorMessage errorMessage={error.message} />
  } 

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
