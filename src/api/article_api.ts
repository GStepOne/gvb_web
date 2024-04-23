import {type baseResponse, type paramsType, useAxios, type optionType, type listDataType} from "@/api/index";
import type {imageIdType} from "@/api/image_api";
import {cacheRequest} from "@/api/index"

export interface articleType {
    abstract: string,
    banner_id: number,
    banner_url: string,
    category: string,
    content: string,
    collects_count: number,
    comment_count: number,
    created_at: string,
    digg_count: number,
    id: string,
    link: string,
    look_count: number,
    source: string,
    tags: string[],
    title: string,
    updated_at: string,
    user_avatar: string,
    user_id: number,
    user_nick_name: string
}

export function articleListApi(params: paramsType): Promise<baseResponse<listDataType<articleType[]>>> {
    return useAxios.get("/api/article", {params})
}

//个人收藏的列表
export function articleCollectsApi(params: paramsType): Promise<baseResponse<optionType[]>> {
    return useAxios.get("/api/article/collects",{params})
}


export const articleCategoryListApi: () => Promise<baseResponse<optionType[]>> = cacheRequest(() => useAxios.get("/api/categories"))

export interface articleUpdateType {
    abstract?: string,
    banner_url?: string,
    banner_id?: number,
    category?: string,
    content?: string,
    id?: string,
    link?: string,
    source?: string,
    tags?: string[],
    title?: string,
    created_at?: string,
}

//articleUpdateApi 更新
export function articleUpdateApi(data: articleUpdateType): Promise<baseResponse<string>> {
    return useAxios.put("/api/article", data)
}


export interface articleItemType {
    abstract: string,
    banner_id?: number,
    banner_url: string,
    category: string,
    collects_count: number,
    comment_count: number,
    created_at: string,
    digg_count: number,
    id: string,
    link?: string,
    look_count: number,
    source?: string,
    tags?: string[],
    title: string,
    updated_at?: string,
    user_avatar?: string,
    user_id?: number,
    user_nick_name?: string
}

export interface articleDataType {
    collects_count: number,
    digg_count: number,
    comment_count: number,
    look_count: number,
}

export function articleCreateApi(data: articleUpdateType): Promise<baseResponse<string>> {
    return useAxios.post("/api/article", data)
}

//获取文章内容
export function articleDetailApi(id: string): Promise<baseResponse<articleUpdateType>> {
    return useAxios.get("/api/article/" + id.toString());
}

