import {type baseResponse, type listDataType, useAxios} from "@/api/index";
import type {paramsType} from "@/api/index";

export function logListApi(params: logRequest): Promise<baseResponse<listDataType<logType>>> {
    return useAxios.get("/api/log", {params: params})
}


export function logReadApi(id: number): Promise<baseResponse<string>> {
    return useAxios.put("/api/log", {id: id})
}

export interface logRequest extends paramsType {
    level?: number //1 info 2 warning 3 err
    type?: number  //1 登录 2操作 3 运行
    ip?: string
    user_id?: number
    addr?: string
    date?: string
    status?: number //1 成功 2失败
    user_name?: string
}


export interface logType {
    readonly id: number
    created_at: string
    updated_at: string
    ip: string
    addr: string
    level: string
    title: string
    content: string
    user_id: number
    user_name: string
    service_name: string
    status: boolean
    type: string //日志类型
    read_status: boolean
}
