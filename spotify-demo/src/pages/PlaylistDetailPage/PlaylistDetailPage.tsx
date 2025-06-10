import React from 'react'
import useGetPlaylist from '../../hooks/useGetPlaylist'
import { Navigate, useParams } from 'react-router'
import PlaylistDetailHeader from './components/PlaylistDetailHeader';

const PlaylistDetailPage = () => {
  const {id} = useParams<{ id: string }>();
  if(id === undefined) return <Navigate to= "/" />;
  const { data:playlist } = useGetPlaylist({playlist_id: id});
  console.log("playlist:", playlist);

  return (
    <div>
      <PlaylistDetailHeader playlist={playlist} />
    </div>
  )
}

export default PlaylistDetailPage
