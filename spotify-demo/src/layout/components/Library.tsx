import React from 'react'
import EmptyPlaylist from './EmptyPlaylist'
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPalylists';
import Playlist from './Playlist';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import ErrorMessage from '../../common/components/ErrorMessage';

const Library = () => {
  
  const {data, isLoading, error} = useGetCurrentUserPlaylists({limit:10, offset: 0});
  console.log("ddd", data);

  if(isLoading) return <LoadingSpinner />;
  if(error) {
    return <ErrorMessage errorMessage={error.message} />
  }

  return (
    <div>
      {!data || data?.total === 0
      ? (<EmptyPlaylist />)
      :
        (
         <div>
          <Playlist playlists={data.items} />
         </div> 
        )
      }
        
    </div>
  )
}

export default Library
