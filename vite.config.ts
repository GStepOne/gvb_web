import {fileURLToPath, URL} from 'node:url'
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

import type {ImportMetaEnv} from "./env";

//要做代理
export default defineConfig(({mode}) => {
    let env: Record<keyof ImportMetaEnv, string> = loadEnv(mode, process.cwd())
    // console.log(env, process.cwd())
    const serverUrl = env.VITE_SERVER_URL
    const wsUrl = serverUrl.replace("http", "ws")
    console.log("wsUrl", wsUrl)
    return {
        plugins: [
            vue(),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            //局域网 这里访问localhost:81 访问的是前端地址
            host: "0.0.0.0",
            port: 8081,
            proxy: {
                //从/api开始代理
                "/api": {
                    target: serverUrl,//实际的路径
                    changeOrigin: true,
                },
                "/uploads": {
                    target: serverUrl,
                    changeOrigin: true,
                },
                "/ws": {
                    target: wsUrl,
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path: string) => path.replace(/^\/ws/, "")
                },
            }

        }
    }
})
