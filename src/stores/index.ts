import {defineStore} from 'pinia'

export interface userInfoType {
    nick_name: string
    role: number
    user_id: number
    avatar: string
    token: string
}

const collapsed = false
const theme = true //light false dark

const userInfo: userInfoType = {
    nick_name: "Jack&Leo",
    role: 0,
    user_id: 0,
    avatar: "/image/choppa.jpeg",
    token: ""
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
        }
    },
    getters: {
        themeString(): string {
            return this.theme ? "light" : "dark"
        }
    }
})
