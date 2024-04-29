import {type baseResponse, useAxios} from "@/api/index";

export interface newsType {
    hotValue: string
    index: string | number
    link: string
    title: string
}

export interface newsParamsType {
    id: string,
    size: number
}

export function newsListApi(params: newsParamsType): Promise<baseResponse<newsType[]>> {
    return useAxios.get("api/news", {params})
}