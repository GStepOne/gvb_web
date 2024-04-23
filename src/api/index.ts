import axios, {type AxiosInstance} from "axios";
import {useStore} from "@/stores";
import {Message} from "@arco-design/web-vue"
//创建实例

export const useAxios: AxiosInstance = axios.create({

    // baseURL:"http://127.0.0.1:8081", //只是这样会有cors问题
    //这个跟vite那个只能留一个
    baseURL: "",
})

export interface baseResponse<T> {
    code: number
    data: T
    msg: string
}


// export interface listResponse<T> {
//     code: number
//     data: {
//         count: number
//         list: []
//     }
//     msg: string
// }


export interface listDataType<T> {
    count: number
    list: T[]
}


export interface paramsType {
    page?: number
    limit?: number
    key?: string
    sort?: string
}


export interface optionType {
    label: string
    value?: string | number
}

//基础查询

//请求中间件

useAxios.interceptors.request.use((config) => {
    const store = useStore()
    config.headers["token"] = store.userInfo.token

    return config
})

//响应中间件
useAxios.interceptors.response.use((response) => {
    if (response.status !== 200) {
        console.log("服务失败", response.status)
        Message.error(response.statusText)
        return Promise.reject(response.statusText)
    }

    return response.data
}, (err) => {
    console.log("服务错误", err.msg)
    Message.error(err.msg)
    return Promise.reject(err)
})


export function defaultDeleteApi<T extends number | string>(url: string, idList: T[]): Promise<baseResponse<string>> {
    return useAxios.delete(url, {
        data: {
            id_list: idList
        }
    })
}

//默认的option获取方法
export function defaultOptionApi(url: string, params?: paramsType): Promise<baseResponse<optionType[]>> {
    return useAxios.get(url, {params})
}

//防止短时间内的重复请求
export function cacheRequest<T>(func: () => Promise<T>): () => Promise<T> {
    let lastRequestTime: number = 0;//上次请求的时间
    let cacheData: T | null = null;//上次请求缓存的数据
    let currentRequest: Promise<T> | null = null;

    return function () {
        const currentTime = Date.now();
        const timeDiff = currentTime - lastRequestTime
        if (timeDiff < 1000 && cacheData) {
            return Promise.resolve(cacheData);
        }
        //没有缓存数据，或者时间超过一秒，那就发起新的请求
        if (!currentRequest) {
            currentRequest = func().then((res: T) => {
                //更新之前的数据和时间
                lastRequestTime = currentTime
                cacheData = res
                //重置当前请求
                currentRequest = null
                return res
            })
        }

        return currentRequest;
    }
}