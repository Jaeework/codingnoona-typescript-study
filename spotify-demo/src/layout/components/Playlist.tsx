import React, { useState } from 'react'
import { SimplifiedPlaylist } from '../../models/playlist';
import { useNavigate } from 'react-router';
import PlaylistItem from '../../common/components/PlaylistItem';
import { styled } from '@mui/material';

interface PlaylistProps {
    playlists: SimplifiedPlaylist[];
}

const PlaylistContainer = styled("div")(({theme}) => ({
    height: "100%",
    overflowY: "auto",
    maxHeight: "calc(100vh - 240px)",
}));

const Playlist = ({ playlists }: PlaylistProps) => {
    const [selectedId, setSelectedId] = useState<string>("");
    const navigate = useNavigate();
    const handleItemClick = (id: string) => {
        setSelectedId(id);
        navigate(`/playlist/${id}`);
    };

    return (
        <PlaylistContainer>
            {playlists.map((item) => (
                <PlaylistItem 
                    key={item.id}
                    playlist={item} 
                    handleClick={handleItemClick} 
                    selected={selectedId === item.id} />
            ))}
        </PlaylistContainer>
    )
}

export default Playlist
