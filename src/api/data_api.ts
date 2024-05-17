import {type baseResponse, useAxios} from "@/api/index";

export interface LoginDataType {
    date_list: [],
    login_list: [],
    sign_list: [],
}

export interface loginDataRequest {
    data: number
}


export function dataLoginApi(params: loginDataRequest): Promise<baseResponse<LoginDataType>> {
    return useAxios.get("/api/data_seven", params)
}


export interface statisticsType {
    user_count: number,
    article_count: number,
    message_count: number,
    chat_group_count: number,
    now_login_count: number,
    now_sign_count: number,
}

//统计的api
export function statisticsApi(): Promise<baseResponse<statisticsType>> {
    return useAxios.get("/api/data_sum")
}

export interface weatherType {
    province: string,
    city: string,
    adcode?: string,
    weather: string,
    temperature: string
    winddirection: string
    windpower?: string
    humidity: string
    reporttime?: string
    temperature_float?: string
    humidity_float?: string
}

export function weatherApi(): Promise<baseResponse<weatherType>> {
    return useAxios.get("/api/weather")
}
