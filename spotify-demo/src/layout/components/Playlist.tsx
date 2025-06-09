import React, { useState } from 'react'
import { SimplifiedPlaylist } from '../../models/playlist';
import { useNavigate } from 'react-router';
import PlaylistItem from '../../common/components/PlaylistItem';

interface PlaylistProps {
    playlists: SimplifiedPlaylist[];
}

const Playlist = ({ playlists }: PlaylistProps) => {
    const [selectedId, setSelectedId] = useState<string>("");
    const navigate = useNavigate();
    const handleItemClick = (id: string) => {
        setSelectedId(id);
        navigate(`/playlist/${id}`);
    };

    return (
        <div>
            {playlists.map((item) => (
                <PlaylistItem 
                    key={item.id}
                    playlist={item} 
                    handleClick={handleItemClick} 
                    selected={selectedId === item.id} />
            ))}
        </div>
    )
}

export default Playlist
