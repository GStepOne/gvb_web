import {createRouter, createWebHistory} from 'vue-router'
import type {RouteMeta} from "vue-router";
import {useStore} from "@/stores";
import {Message} from "@arco-design/web-vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'web',
            children: [
                {
                    path: "/",
                    name: "index",
                    meta: {
                        title: "home"
                    },
                    component: () => import("../views/web/index.vue")
                },
                {
                    path: "news",
                    name: "news",
                    meta: {
                        title: "新闻"
                    },
                    component: () => import("../views/web/news.vue")
                },
                {
                    path: "search",
                    name: "search",
                    meta: {
                        title: "搜索"
                    },
                    component: () => import("../views/web/search.vue")
                },
                {
                    path: "chat",
                    name: "chat",
                    meta: {
                        title: "聊天室"
                    },
                    component: () => import("../views/web/chat.vue")
                }, {
                    path: "article/:id",
                    name: "article",
                    meta: {
                        title: "文章详情"
                    },
                    component: () => import("../views/web/article.vue")
                }
            ]
        },
        {
            path: '/login',//登录
            name: 'login',
            component: () => import("../views/login/index.vue")
        },
        {
            path: '/nana',
            name: 'nana',
            component: () => import("../views/admin/index.vue"),
            meta: {
                title: "首页",
                isAdmin: true,//只有管理员能看
                isLoggedIn: true,
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
                        }, {
                            path: "add_article",
                            name: "add_article",
                            meta: {
                                title: "我的发布"
                            },
                            component: () => import("../views/admin/user_center/user_add_article_list.vue")
                        },
                        {
                            path: "user_collects",
                            name: "user_collects",
                            meta: {
                                title: "我的收藏"
                            },
                            component: () => import("../views/admin/user_center/user_collects_list.vue")
                        },
                        {
                            path: "user_messages",
                            name: "user_messages",
                            meta: {
                                title: "我的消息"
                            },
                            component: () => import("../views/admin/user_center/user_message_list.vue")
                        }
                    ]
                },
                {
                    path: "article_mgr",
                    name: "article_mgr",
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
                        }, {
                            path: "image_list",
                            name: "image_list",
                            meta: {
                                title: "图片列表"
                            },
                            component: () => import("../views/admin/article/image_list.vue")
                        }, {
                            path: "comment_list",
                            name: "comment_list",
                            meta: {
                                title: "评论列表"
                            },
                            component: () => import("../views/admin/article/comment_list.vue")
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
                        },
                        {
                            path: "message_list",
                            name: "message_list",
                            meta: {
                                title: "消息列表"
                            },
                            component: () => import("../views/admin/users/message_list.vue")
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
                            path: "carousel_list",
                            name: "carousel_list",
                            meta: {
                                title: "轮播图"
                            },
                            component: () => import("../views/admin/system/carousel_list.vue")
                        },
                        {
                            path: "system",
                            name: "system_settings",
                            meta: {
                                title: "系统配置"
                            },
                            redirect: "/nana/system/system/site",
                            component: () => import("../views/admin/system/system_settings.vue"),
                            children: [
                                {
                                    path: "site",
                                    name: "site_config",
                                    meta: {
                                        title: "网站设置"
                                    },
                                    component: () => import("../views/admin/system/config/site_config.vue"),
                                },
                                {
                                    path: "email",
                                    name: "email_config",
                                    meta: {
                                        title: "邮箱设置"
                                    },
                                    component: () => import("../views/admin/system/config/email_config.vue"),
                                },
                                {
                                    path: "qiniu",
                                    name: "qiniu_config",
                                    meta: {
                                        title: "七牛云设置"
                                    },
                                    component: () => import("../views/admin/system/config/qiniu_config.vue"),
                                },
                                {
                                    path: "qq",
                                    name: "qq_config",
                                    meta: {
                                        title: "QQ设置"
                                    },
                                    component: () => import("../views/admin/system/config/qq_config.vue"),
                                },
                                {
                                    path: "jwt",
                                    name: "jwt_config",
                                    meta: {
                                        title: "JWT设置"
                                    },
                                    component: () => import("../views/admin/system/config/jwt_config.vue"),
                                },
                            ]
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

import NProgress from "nprogress";

router.beforeEach((to, from, next) => {
    const store = useStore()
    const meta: RouteMeta = to.meta
    console.log("当前登录", store.isLogin)

    if (!store.isLogin) {
        if (to.path === '/login') {
            next();//这里不能写false
            return;
        }else {
            next({path: '/login'}); // 重定向到登录页面
            return;
        }
    }

    //如果是普通用户
    if (store.isCommon && (meta.isAdmin || meta.isTourist)) {
        Message.warning("普通用户权限不足")
        // router.push({name: from.name as string})
        next(false)
        return
    }
    //当前是游客，不是游客的就不能看
    if (store.isTourist && meta.isTourist === false) {
        Message.warning("游客权限不足")
        // router.push({name: from.name as string})
        next(false)
        return
    }

    NProgress.start()
    //判断目标地址的meta值
    next()
})


router.afterEach(() => {
    NProgress.done() //完成进度条
})