import {type baseResponse, type listDataType, type paramsType, useAxios} from "@/api/index";

export interface modelType {
    id: string,
    created_at: string,
    updated_at: string,
}

export interface chatType {
    avatar: string,
    content: string,
    created_at: string,
    is_group?: boolean,
    message_type: number, //1 是系统消息-进入  2是文本消息 7 系统消息-离开
    nick_name: string,
    id?: number
    ip?: string
    addr?: string,
    is_me: boolean,
    model: modelType
}

export function chatRecordApi(params: paramsType): Promise<baseResponse<listDataType<chatType>>> {
    return useAxios.get("/api/chat_message_list", {params})
}

export function chatRemoveApi(id_list: number[]): Promise<baseResponse<string>> {
    return useAxios.delete("/api/chat_delete_message", {data: {id_list}});
}


export interface chatGroupConfigType {
    is_anonymous: boolean
    is_show_time: boolean
    default_limit: number
    welcome_title: string
    is_online_people: false //是否显示在线人数
    is_send_image: boolean
    is_paste: boolean
    is_send_file: boolean
    is_markdown: boolean
    content_length: number
}


export interface chatMessageType {
    avatar: string,
    content: string,
    created_at: string,
    message_type: number,
    nick_name: string,
    online_count: number,
}
