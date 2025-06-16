import { ApiResponse } from "./apiResponse";
import { Image } from "./commonType";

export interface SearchCategoriesRequestParams {
    locale?: string;
    limit?: number;
    offset?: number;
}

export interface SearchCategoriesResponse {
    categories: ApiResponse<Categories>;
}

export interface Categories {
    href: string;
    icons: Image[];
    id: string;
    name: string;
}
