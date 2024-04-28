import {type baseResponse, type listDataType, useAxios} from "@/api/index";
import type {chatGroupConfigType} from "@/api/chat_api";

export interface siteInfoType {
    addr: string
    bei_an: string
    bilibili: string
    created_at: string
    email: string
    gitee_url: string
    github_url: string
    job: string
    name: string
    qq_image: string
    slogan: string
    slogan_en: string
    title: string
    version: string
    web: string
    wechat_image: string
}

export function siteInfoApi(): Promise<baseResponse<siteInfoType>> {
    return useAxios.get("/api/settings/site")
}


export function siteInfoUpdateApi(data: siteInfoType): Promise<baseResponse<listDataType<any>>> {
    return useAxios.put("/api/settings/site", data)
}

export interface EmailType {
    host: string,
    port: number,
    user: string,
    password: string
    default_from_email: string
    use_ssl: boolean,
    use_tls: boolean,
}

export interface QQType {
    app_id: string,
    app_key: string,
    redirect: string,
}

export interface JwtType {
    secret: string,
    expires: number,
    issuer: string,
}

export interface QiniuType {
    access_key: string,
    secret_key: string,
    bucket: string,
    cdn: string,
    zone: string,
    size: number
    prefix: string
    enable: boolean
}

export type SettingTypes = EmailType | QQType | JwtType | QiniuType | chatGroupConfigType

export type SettingInfo = "qq" | "email" | "qiniu" | "jwt" | "chat_group"

export function settingsInfoApi<T extends EmailType | QQType | JwtType | QiniuType>(name: SettingInfo): Promise<baseResponse<T>> {
    return useAxios.get("/api/settings/" + name.toString())
}

export function settingsInfoUpdateApi<T extends SettingTypes>(name: SettingInfo, data: T): Promise<baseResponse<string>> {
    return useAxios.put("/api/settings/" + name.toString(), data)
}

export interface helpType {
    title: string;
    abs?: string,
    content?: string,
}