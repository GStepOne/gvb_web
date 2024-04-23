import {type baseResponse, type listDataType, type paramsType, useAxios} from "@/api/index";

export interface messageType {
    avatar: string
    count: number
    nickname: string
    user_id: number
    user_name: string
}


export interface messageRecordType {
    content?: string
    created_at?: string
    message_count?: number
    rev_user_avatar?: string
    rev_user_id?: number
    rev_user_nick_name?: string
    send_user_avatar?: string
    send_user_id?: number
    send_user_nickname?: string
    is_me?: boolean
}

export interface messageParams extends paramsType {
    nickname?: string
}


//聊天记录列表（有哪些人聊天，聊了几条，最左侧部分）
export function messageUserListApi(params?: messageParams): Promise<baseResponse<listDataType<messageType>>> {
    return useAxios.get("/api/messages_user", {params: params})
}

//聊了几条里面都是有谁，中间部分
export function messageUserListByUserApi(userId: number): Promise<baseResponse<listDataType<messageType>>> {
    return useAxios.get("/api/messages_user/" + userId.toString())
}

//最右侧部分，聊天的内容都是什么
export function messageUserRecordApi(sendUserId: number, revUserId: number): Promise<baseResponse<listDataType<messageRecordType>>> {
    return useAxios.get("/api/messages", {
        params: {
            "send_user_id": sendUserId.toString(),
            "rev_user_id": revUserId.toString()
        }
    })
}

export function messageUserMeRecordApi(sendUserId: number, revUserId: number): Promise<baseResponse<listDataType<messageRecordType>>> {
    return useAxios.get("/api/messages", {
        params: {
            "send_user_id": sendUserId.toString(),
            "rev_user_id": revUserId.toString()
        }
    })
}

export function messageUserListByMeApi(userId: number): Promise<baseResponse<listDataType<messageType>>> {
    return useAxios.get("/api/messages_user/" + userId.toString())
}

export interface messagePublishType {
    content: string
    send_user_id: number
    rev_user_id: number
}

//发布消息
export function messagePublishApi(data: messagePublishType): Promise<baseResponse<string>> {
    return useAxios.post("/api/message", data);
}