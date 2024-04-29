import {type baseResponse, useAxios} from "@/api/index";
import type {optionType} from "@/types";
import {cacheRequest} from "@/api/index"
import type {articleType} from "@/api/article_api";
//获取标签的数据没有分页
// export function tagOptionsApi():Promise<baseResponse<optionType[]>>{
//     return useAxios.get("/api/tags");
// }
export const tagOptionsApi: () => Promise<baseResponse<optionType[]>> = cacheRequest(() => useAxios.get("/api/tags"))


export interface tagType {
    tag: string
    count: number
}

export function tagArticleListApi(): Promise<baseResponse<tagType>> {
    return useAxios.get("/api/article/tags")
}