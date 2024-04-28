import type {baseResponse, listDataType, paramsType} from "@/api/index";
import {useAxios} from "@/api/index";

export interface promotionType {
    id: number
    title: string
    href: string
    images: string
    is_show: boolean
    created_at: string
    updated_at: string
}

//获取广告列表
export function promotionListApi(params?: paramsType): Promise<baseResponse<listDataType<any>>> {
    //增加一个referer 头
    return useAxios.get("/api/advert", {
        params: params, headers: {
            "Gvb_referer": location.pathname
        }
    })
}


export interface promotionCreateType {
    id?: number|undefined
    href: string
    images: string
    is_show: boolean
    title: string
}

export const defaultPromotionForm = {
    href: "",
    images: "",
    is_show: false,
    title: "",
    updated_at: "",
    id: 0
}

//广告创建
export function promotionCreateApi(data: promotionCreateType): Promise<baseResponse<string>> {
    return useAxios.post("/api/advert", data)
}

//广告更新
export function promotionUpdateApi(id: number, data: promotionCreateType): Promise<baseResponse<string>> {
    return useAxios.put("/api/advert/" + id.toString(), data)
}