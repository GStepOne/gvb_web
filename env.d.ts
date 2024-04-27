/// <reference types="vite/client" />

export interface ImportMetaEnv {
    VITE_SERVER_URL: string
}

import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        isLogin?: boolean
        isAdmin?: boolean
        isTourist?: boolean
        title?: string
    }
}

//声明全局变量 vue的 views里面的 都是局部变量，所以使用的时候 要先赋值
//const isLopTop = isLoptops 这样就可以在views里面使用了
declare global {
    const isLoptops: boolean
}

