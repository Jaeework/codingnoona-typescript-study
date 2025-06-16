import { useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query"
import { getSearchCategories } from "../apis/searchApi";
import { SearchCategoriesRequestParams } from "../models/category";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetCategories = (params: SearchCategoriesRequestParams) => {
    const clientCredentialToken = useClientCredentialToken();

    return useInfiniteQuery({
        queryKey: ["categories", params],
        queryFn: ({pageParam = 0}) => {
            if(!clientCredentialToken) throw new Error("no token available");
            return getSearchCategories(clientCredentialToken, {...params, offset: pageParam});
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const nextPageUrl = lastPage.categories.next;

            if(nextPageUrl) {
                const nextOffset = new URL(nextPageUrl).searchParams.get("offset");
                return nextOffset ? parseInt(nextOffset) : undefined;
            }
        },
        enabled: !!clientCredentialToken,
    })
}

export default useGetCategories;
