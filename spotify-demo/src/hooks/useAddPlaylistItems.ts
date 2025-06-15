import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPlaylistItems } from "../apis/playlistApi";
import { AddPlaylistItemsRequest } from "../models/playlist";

const useAddPlaylistItems = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: AddPlaylistItemsRequest) => {

            return addPlaylistItems(params);
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["playlist-detail", variables.playlist_id] });
            queryClient.invalidateQueries({ queryKey: ["playlist-items"] });
            queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
        },
    });
}

export default useAddPlaylistItems;
