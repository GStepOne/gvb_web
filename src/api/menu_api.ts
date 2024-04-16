import {useAxios} from "@/api/index";
import type {paramsType, baseResponse, listDataType} from "@/api/index";
import type {imageIdType} from "@/api/image_api";

export interface bannerType {
    id: number
    path: string
}


export interface menuType {
    id: number,
    created_at: string,
    title: string,
    title_en: string,
    slogan: string,
    abstract: string[],
    abstract_time: number,
    banners: bannerType[],
    banner_time: number,
    sort: number,
    // Banners: bannerType[]
}

//菜单列表
export function menuListApi(params: paramsType): Promise<baseResponse<listDataType<menuType>>> {
    return useAxios.get("/api/menus", {params: params})
}

export interface ImageIdSortList {
    image_id: number
    sort: number
}

export interface menuCreateRequest {
    image_sort_list: ImageIdSortList[],
    path: string,
    title: string,
    slogan: string,
    abstract: string[],
    abstract_time: number,
    banner_time: number,
    sort: number,
    banners: imageIdType[]
}

//创建api
export function menuCreateApi(data: menuCreateRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/menus", data)
}

export const defaultForm = {
    image_sort_list: [],
    path: "",
    title: "",
    slogan: "",
    abstract: [],
    abstract_time: 0,
    banner_time: 0,
    sort: 1,
    abstractString: "",
    imageIdList: []
}

//菜单更新
export function menuUpdateApi(id: number, data: menuCreateRequest): Promise<baseResponse<string>> {
    return useAxios.put("/api/menus/" + id.toString(), data)
}