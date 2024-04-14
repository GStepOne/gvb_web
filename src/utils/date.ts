import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import "dayjs/locale/zh-cn"

dayjs.extend(relativeTime)
dayjs.locale('zh-cn') //中文化
export function dateTimeFormat(date: string) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

export function dateFormat(date: string) {
    return dayjs(date).format('YYYY-MM-DD');
}

//相对现在的时间
export function relativeCurrentTime(date: string) {
    return dayjs(date).fromNow()
}

