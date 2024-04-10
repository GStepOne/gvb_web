import {defineStore} from 'pinia'
import {parseToken} from "@/utils/jwt";
import {logoutApi} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import {userInfoApi} from "@/api/user_api";
import type {userInfoType} from "@/api/user_api";

export interface userStoreUserInfoType {
    user_name: string
    nick_name: string
    role: number
    user_id: number
    avatar: string
    token: string
    exp: number //过期时间需要x1000
}

const collapsed = false
const theme = true //light false dark

const userInfo: userStoreUserInfoType = {
    nick_name: "",
    user_name: "",
    role: 0,
    user_id: 0,
    avatar: "",
    token: "",
    exp: 0,
}
export const useStore = defineStore('counter', {
    state() {
        return {
            theme: theme,
            collapsed: collapsed, //后台侧边栏的搜索状态，默认展开
            userInfo: userInfo
        }
    },
    actions: {
        setTheme(localTheme?: boolean) {
            console.log("当前的", localTheme)
            if (localTheme !== undefined) {
                this.theme = localTheme
            } else {
                this.theme = !this.theme
            }

            document.documentElement.style.colorScheme = this.themeString
            document.body.setAttribute("arco-theme", this.themeString);

            localStorage.setItem("theme", JSON.stringify(this.theme))
        },

        loadTheme() {
            let val = localStorage.getItem("theme")
            if (val === null) {
                return
            }
            try {
                this.theme = JSON.parse(val)
                this.setTheme(this.theme)
            } catch (e) {
                return
            }
        },
        setCollapsed(collapsed: boolean) {
            this.collapsed = collapsed
        },
        async setToken(token: string) {
            this.userInfo.token = token
            let res = await userInfoApi()
            let info = parseToken(token)
            let data = res.data
            this.userInfo = {
                user_name: data.user_name,
                nick_name: data.nick_name,
                role: info.role,
                user_id: info.user_id,
                avatar: data.avatar,
                token: token,
                exp: info.exp,
            }

            Object.assign(this.userInfo, info)
            localStorage.setItem("userInfo", JSON.stringify(this.userInfo))

        },
        loadToken() {
            let val = localStorage.getItem("userInfo")
            if (val === null) {
                return
            }
            try {
                this.userInfo = JSON.parse(val)
            } catch (e) {
                console.error("解析token失败" + e)
                this.clearUserInfo()
                return;
            }

            //判断token是否过期
            let exp = Number(this.userInfo.exp) * 1000
            let nowTime = new Date().getTime()
            if ((exp - nowTime) <= 0) {
                Message.warning("登录已过期")
                this.clearUserInfo()
                return
            }
        },
        async logout() {
            await logoutApi()
            //置空用户
            this.clearUserInfo()
            //清空localstorage里面
            localStorage.setItem("userInfo","")
        },
        clearUserInfo() {
            this.userInfo = userInfo
        }
    },
    getters: {
        themeString(): string {
            return this.theme ? "light" : "dark"
        },
        isLogin(): boolean {
            //角色不等于0
            return this.userInfo.role !== 0
        },
        isAdmin(): boolean {
            console.log("角色", this.userInfo.role)
            //角色等于1 2是普通用户 3 是游客
            return this.userInfo.role === 1
        },
        isTourist(): boolean {
            return this.userInfo.role === 3
        },
        isCommon(): boolean {
            return this.userInfo.role === 2//普通用户
        }
    }
})


