import axios, {type AxiosInstance} from "axios";
import {useStore} from "@/stores";
import {Message} from "@arco-design/web-vue"
//创建实例

export const useAxios = axios.create({

      // baseURL:"http://127.0.0.1:8081", //只是这样会有cors问题
    //这个跟vite那个只能留一个
      baseURL:"",
})

export interface baseResponse<T> {
    code: number
    data: T
    msg: string
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
