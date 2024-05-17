import {type baseResponse, type listDataType, useAxios} from "@/api/index";
import type {optionType} from "@/types";
import {cacheRequest} from "@/api/index"
export const tagOptionsApi: () => Promise<baseResponse<optionType[]>> = cacheRequest(() => useAxios.get("/api/tags"))
export interface tagType {
    tag: string
    count: number
}

export function tagArticleListApi(): Promise<baseResponse<listDataType<tagType>>> {
    return useAxios.get("/api/article/tags")
}
