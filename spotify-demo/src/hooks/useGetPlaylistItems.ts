import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query"
import { GetPlaylistItemsRequest, GetPlaylistItemsResponse } from "../models/playlist";
import { getPlaylistItems } from "../apis/playlistApi";
import { AxiosError } from "axios";

const useGetPlaylistItems = (params: GetPlaylistItemsRequest): UseInfiniteQueryResult<InfiniteData<GetPlaylistItemsResponse, unknown>, AxiosError> => {
    return useInfiniteQuery({
        queryKey: ['playlist-items', params],
        queryFn: ({pageParam = 0}) => {
            return getPlaylistItems({offset:pageParam, ...params});
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if(lastPage.next) {
                const url = new URL(lastPage.next);
                const nextOffset = url.searchParams.get("offset");
                return nextOffset ? parseInt(nextOffset) : undefined;
            }

            return undefined;
        }
    });
}

export default useGetPlaylistItems;
