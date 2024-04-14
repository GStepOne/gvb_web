import {type baseResponse, type paramsType, type optionType} from "@/api/index";
import {useAxios} from "@/api/index";

export function roleIDListApi(params?: paramsType): Promise<baseResponse<optionType[]>> {
    return useAxios.get('/api/role', {params})
}