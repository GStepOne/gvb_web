import {type baseResponse, useAxios} from "@/api/index";

export interface loginEmailType {
    user_name: string
    password: string
}

export function loginEmailApi(request: loginEmailType):Promise<baseResponse<string>> {
    return useAxios.post("/api/user_login",request)
}

export function logoutApi(): Promise<baseResponse<string>> {
    //防止token继续被使用
    return  useAxios.post("/api/logout")
}