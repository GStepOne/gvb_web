import {createRouter, createWebHistory} from 'vue-router'
import {isMemoSame} from "vue";
import type {RouteMeta} from "vue-router";
import {useStore} from "@/stores";
import {Message} from "@arco-design/web-vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'web',
            component: () => import("../views/web/index.vue"),
            children: [
                {
                    path: "",
                    name: "index",
                    meta: {
                        title: "home"
                    },
                    component: () => import("../views/web/index.vue")
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import("../views/login/index.vue")
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import("../views/admin/index.vue"),
            meta: {
                title: "首页"
            },
            children: [
                {
                    path: "",
                    name: "home",
                    component: () => import("../views/admin/home/index.vue")
                },
                {
                    path: "user_center",
                    name: "user_center",
                    meta: {
                        title: "个人中心"
                    },
                    children: [
                        {
                            path: "user_info",
                            name: "user_info",
                            meta: {
                                title: "我的信息"
                            },
                            component: () => import("../views/admin/user_center/user_info.vue")
                        }
                    ]
                },
                {
                    path: "article",
                    name: "article",
                    meta: {
                        title: "文章管理",
                        isAdmin: true,//只有管理员能看
                    },
                    children: [
                        {
                            path: "article_list",
                            name: "article_list",
                            meta: {
                                title: "文章列表"
                            },
                            component: () => import("../views/admin/article/article_list.vue")
                        }
                    ]
                },
                {
                    path: "users",
                    name: "users",
                    meta: {
                        title: "用户管理",
                        isAdmin: true,//只有管理员能看
                        isTourist: true,
                    },
                    children: [
                        {
                            path: "user_list",
                            name: "user_list",
                            meta: {
                                title: "用户列表"
                            },
                            component: () => import("../views/admin/users/user_list.vue")
                        }
                    ]
                },
                {
                    path: "system",
                    name: "system",
                    meta: {
                        title: "系统管理",
                        isAdmin: true,//只有管理员能看
                        isTourist: false,
                    },
                    children: [
                        {
                            path: "menu_list",
                            name: "menu_list",
                            meta: {
                                title: "菜单列表"
                            },
                            component: () => import("../views/admin/system/menu_list.vue")
                        },
                        {
                            path: "promotion_list",
                            name: "promotion_list",
                            meta: {
                                title: "广告列表"
                            },
                            component: () => import("../views/admin/system/promotion_list.vue")
                        },
                        {
                            path: "log_list",
                            name: "log_list",
                            meta: {
                                title: "系统日志"
                            },
                            component: () => import("../views/admin/system/log_list.vue")
                        },
                        {
                            path: "system",
                            name: "system_system",
                            meta: {
                                title: "系统配置"
                            },
                            component: () => import("../views/admin/system/log_list.vue")
                        },
                    ]
                },
                {
                    path: "chat_group",
                    name: "chat_group",
                    meta: {
                        title: "群聊管理"
                    },
                    children: [
                        {
                            path: "chat_list",
                            name: "chat_list",
                            meta: {
                                title: "聊天记录",
                                isTourist: true,
                                isAdmin: true,
                            },
                            component: () => import("../views/admin/chat_group/chat_list.vue")
                        }
                    ]
                }
            ]
        },

    ]
})

export default router


router.beforeEach((to, from, next) => {
    console.log(from.path, to.path)
    const store = useStore()
    const meta: RouteMeta = to.meta

    if (meta.isLogin && !store.isLogin) {
        Message.warning("需要登录")
        router.push({name: from.name as string})
        return
    }
    //如果是普通用户
    if (store.isCommon && (meta.isAdmin || meta.isTourist)) {
        Message.warning("普通用户权限不足")
        router.push({name: from.name as string})
        return
    }
    //当前是游客，不是游客的就不能看
    if (store.isTourist && meta.isTourist === false) {
        Message.warning("游客权限不足")
        router.push({name: from.name as string})
        return
    }
    //判断目标地址的meta值
    next()
})