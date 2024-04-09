import {fileURLToPath, URL} from 'node:url'
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

import type {ImportMetaEnv} from "./env";

// https://vitejs.dev/config/
//要做代理
export default defineConfig(({mode}) => {
    let env: Record<keyof ImportMetaEnv, string> = loadEnv(mode, process.cwd())
    console.log(env, process.cwd())
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
            port: 81,
            proxy: {
                //从/api开始代理
                "/api": {
                    target: env.VITE_SERVER_URL,//实际的路径
                    changeOrigin: true,
                },
                "/uploads": {
                    target: env.VITE_SERVER_URL,
                    changeOrigin: true,
                },
            }

        }
    }
})
