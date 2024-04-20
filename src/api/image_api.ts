import {type paramsType, useAxios} from "@/api/index";
import type {baseResponse, listDataType} from "@/api/index";

export interface imageIdType {
    id: number,
    path: string,
    name: string
}

//获取图片的链接
export function imageIDListApi(): Promise<baseResponse<listDataType<imageIdType[]>>> {
    return useAxios.get("/api/images")
}

export interface imageType {
    created_at: string
    path: string
    hash: string
    name: string
    image_type: string
    id: number
}

export function imageListApi(params?: paramsType): Promise<baseResponse<listDataType<imageType[]>>> {
    return useAxios.get("/api/images", {params: params})
}

export interface imagesUploadResponse {
    file_name: string
    is_success: boolean
    msg: string
}