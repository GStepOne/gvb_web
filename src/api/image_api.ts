import {useAxios} from "@/api/index";
import type {baseResponse, listDataType} from "@/api/index";

export interface imageIdType {
    id: number,
    path: string,
    name: string
}

//获取图片的链接
export function imageListApi(): Promise<baseResponse<listDataType<imageIdType[]>>> {
    return useAxios.get("/api/images")
}