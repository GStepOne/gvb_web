import {type baseResponse, type listDataType, type paramsType, useAxios} from "@/api/index";

export interface commentArticleType {
    title: string,
    count: number,
    id: string
}


export function commentArticleListApi(params?: paramsType): Promise<baseResponse<listDataType<commentArticleType>>> {
    return useAxios.get("/api/article/comments", {params})
}


export interface commentUserType {
    add: string,
    avatar: string,
    ip: string,
    nick_name: string,
}

export interface commentType {
    article_id: string,
    comment_count: number,
    content: string,
    created_at: string,
    digg_count: number,
    id: number,
    parent_comment_id: number | null, //父评论
    user: commentUserType,
    user_id: string,
    sub_comment: commentType[],
    applyContent: string, //人为加上的
    isApply: boolean //是否显示回复那个组件
}


export function commentListApi(id: string, params: paramsType): Promise<baseResponse<listDataType<commentType>>> {
    return useAxios.get("/api/comment", {
        params: {
            "article_id": id.toString(),
            ...params  // 将其他查询参数添加到这里
        }
    });
}

export function commentDeleteApi(id: number): Promise<baseResponse<string>> {
    return useAxios.delete("/api/comment", {params: {id: id.toString()}})
}

//添加评论的
export interface commentAddType {
    article_id: string,
    content: string,
    parent_comment_id?: number
}

//创建评论
export function commentCreateApi(data: commentType): Promise<baseResponse<string>> {
    return useAxios.post("/api/comment", data)
}