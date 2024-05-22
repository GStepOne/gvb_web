import type {baseResponse, listDataType, optionType, paramsType} from "@/api/index";
import {useAxios} from "@/api/index";

export interface loginEmailType {
    user_name: string
    password: string
}

export function loginEmailApi(request: loginEmailType): Promise<baseResponse<string>> {
    return useAxios.post("/api/user_login", request)
}

export function logoutApi(): Promise<baseResponse<string>> {
    //防止token继续被使用
    return useAxios.post("/api/user_logout")
}

export function loginQQPath(): Promise<baseResponse<string>> {
    return useAxios.get("/api/user_qq_login",)
}

export function qqLogin(code: string): Promise<baseResponse<string>> {
    return useAxios.get("/login",{params: {code: code}})
}


export interface userInfoType {
    id: number
    created_at: string
    nick_name: string
    user_name: string
    avatar: string
    email: string
    tel: string
    addr: string
    token: string
    ip: string
    role: string
    role_id: number
    sign_status: string
    integral: number
    sign: string //slogan
    link: string //跳转链接
}


export function userInfoApi(): Promise<baseResponse<userInfoType>> {
    return useAxios.get("/api/user")
}

export function userListApi(params?: paramsType): Promise<baseResponse<listDataType<userInfoType>>> {
    return useAxios.get("/api/user_list", {params})
}

export function userDeleteApi<T>(idList: T[]): Promise<baseResponse<string>> {
    return useAxios.delete("/api/user_delete", {
        data: {
            id_list: idList
        }
    })
}


export interface userCreateRequest {
    nick_name: string
    password: string
    role: number
    user_name: string
}

//用户创建api
export function userCreateApi(data: userCreateRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/user", data)
}

export interface userUpdateRequest {
    nick_name: string
    role: number
    user_id: number
}

export function userUpdateApi(data: userUpdateRequest): Promise<baseResponse<string>> {
    return useAxios.put("/api/user_role", data)
}

export interface userInfoUpdateType {
    link: string
    nick_name: string
    sign: string
    avatar:string
}

export function userInfoUpdateApi(data: userInfoUpdateType): Promise<baseResponse<string>> {
    return useAxios.put("/api/user_info", data)
}

export interface userUpdatePasswordType {
    origin_password: string
    re_password: string
    password: string
}

export function userUpdatePasswordApi(data: userUpdatePasswordType): Promise<baseResponse<string>> {
    return useAxios.put("/api/user_password", data)
}


export interface userBindEmailType {
    code?: string,
    email: string
    password?: string
}

//用户绑定邮箱
export function userBindEmailApi(data: userBindEmailType): Promise<baseResponse<string>> {
    return useAxios.post("/api/user_bind_mail", data)
}
