import {type baseResponse, type paramsType, useAxios, type optionType, type listDataType} from "@/api/index";
import type {imageIdType} from "@/api/image_api";
import {cacheRequest} from "@/api/index"

interface articleItem {
    id: string
    title: string
}

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
    is_collect?: boolean,
    is_digg?: boolean,
}

//    next?: articleItem,
//     prev?: articleItem,

type sortType =
    ""
    | "look_count desc"
    | "created_at desc"
    | "digg_count desc"
    | "comment_count desc"
    | "collects_count desc";

//因为这里 paramsType 也定义了sort
export interface articleParamsType extends paramsType {
    date?: string
    tag?: string
    category?: string
    sort?: string
}

export function articleListApi(params: articleParamsType): Promise<baseResponse<listDataType<articleType>>> {
    return useAxios.get("/api/article", {params: params})
}

//个人收藏的列表
export function articleCollectsApi(params: paramsType): Promise<baseResponse<listDataType<optionType[]>>> {
    return useAxios.get("/api/article/collects", {params})
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
    id?: string,
    created_at?: string
    tags?: string[]
}

export function articleCreateApi(data: articleUpdateType): Promise<baseResponse<string>> {
    return useAxios.post("/api/article", data)
}

//获取文章内容
export function articleDetailApi(id: string): Promise<baseResponse<articleUpdateType>> {
    return useAxios.get("/api/article/" + id.toString());
}

export interface articleCalendarType {
    count: number,
    date: string
}

export function articleCalendarApi(): Promise<baseResponse<articleCalendarType[]>> {
    return useAxios.get("/api/article/calendar");
}

export function articleDetailWebApi(id: string): Promise<baseResponse<articleType>> {
    return useAxios.get("/api/article/" + id.toString());
}

export function articleCollectsPostApi(id: string): Promise<baseResponse<string>> {
    return useAxios.post("/api/article/collects", {id: id});
}

export function articleDiggPostApi(id: string): Promise<baseResponse<string>> {
    return useAxios.post("/api/digg", {id: id});
}

export interface articleSearchType {
    body: string
    id: string
    key: string
    slug: string
    title: string
}

export function articleSearchApi(params: paramsType): Promise<baseResponse<listDataType<articleSearchType>>> {
    return useAxios.get("/api/article/fulltext", {params});
}