import {type paramsType, useAxios} from "@/api/index";
import type {baseResponse, listDataType} from "@/api/index";
import {cacheRequest} from "@/api/index"

export interface imageIdType {
    id: number,
    path: string,
    name: string,
    image_type: "本地" | "七牛云"
}

//获取图片的链接
// export function imageIdListApi(): Promise<baseResponse<imageIdType[]>> {
//     return useAxios.get("/api/image")
// }

export const imageIdListApi: () => Promise<baseResponse<imageIdType[]>> = cacheRequest(() => useAxios.get("/api/image"))

export interface imageType {
    created_at: string
    path: string
    hash: string
    name: string
    image_type: string
    id: number
}

// export function imageListApi(params?: paramsType): Promise<baseResponse<listDataType<imageType[]>>> {
//     return useAxios.get("/api/images", {params: params})
// }


export const imageListApi: (params?: paramsType) => Promise<baseResponse<listDataType<imageType[]>>> = cacheRequest((params?: paramsType) => useAxios.get("/api/images", {params}))


export interface imagesUploadResponse {
    file_name: string
    is_success: boolean
    msg: string
}


// export function uploadImageApi(file: File): Promise<baseResponse<string>> {
//     return new Promise((resolve, reject) => {
//         const form = new FormData()
//         form.set("image", file)
//         useAxios.post("/api/image", form, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             }
//         }).then((res:any) => resolve(res)).catch(err => reject(err))
//     })
//     // return useAxios.post("/api/image", {"image": file})
// }

export function uploadImageApi(file: File): Promise<baseResponse<string>> {
    return new Promise((resolve, reject) => {
        const form = new FormData()
        form.set("image", file)
        useAxios.post("/api/image", form, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((res: any) => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}
