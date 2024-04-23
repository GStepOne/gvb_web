import {type baseResponse, useAxios} from "@/api/index";
import type {optionType} from "@/types";
import {cacheRequest} from "@/api/index"
//获取标签的数据没有分页
// export function tagOptionsApi():Promise<baseResponse<optionType[]>>{
//     return useAxios.get("/api/tags");
// }
export const tagOptionsApi:()=>Promise<baseResponse<optionType[]>> = cacheRequest(()=>useAxios.get("/api/tags"))