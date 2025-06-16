import axios, { AxiosError } from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { SearchRequestParams, SearchResponse } from "../models/search";
import { SearchCategoriesRequestParams, SearchCategoriesResponse } from "../models/category";
import api from "../utils/api";

export const searchItemsByKeyword = async (token: string, params: SearchRequestParams): Promise<SearchResponse> => {
    try {
        const searchParams = new URLSearchParams();
        searchParams.append("q", params.q);
        searchParams.append("type", params.type.join(","));

        if (params.market) searchParams.append("market", params.market);
        if (params.limit) searchParams.append("limit", params.limit.toString());
        if (params.offset) searchParams.append("offset", params.offset.toString());
        if (params.include_external) searchParams.append("include_external", params.include_external);

        const response = await axios.get(`${SPOTIFY_BASE_URL}/search?${searchParams.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("fail to search by keyword");
    }
}

export const getSearchCategories = async (token: string, params: SearchCategoriesRequestParams): Promise<SearchCategoriesResponse> => {
    try {
        const searchParams = new URLSearchParams();

        if (params.locale) searchParams.append("locale", params.locale.toString());
        if (params.limit) searchParams.append("limit", params.limit.toString());
        if (params.offset) searchParams.append("offset", params.offset.toString());

        const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories?${searchParams.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("fail to fetch search categories");
    }
}
