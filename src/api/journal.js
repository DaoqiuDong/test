import request from '@/utils/request'
import { formatDate2 } from '@/utils'


// 查询操作日志列表
export function listOprJournal(query) {
    return request({
        url: '/api/oprJournal/list',
        method: 'post',
        data: wrapper(query)
    })
}
export function listLoginJournal(query) {
    return request({
        url: '/api/loginJournal/list',
        method: 'post',
        data: wrapper(query)
    })
}



function wrapper(data) {
    const cloneData = JSON.parse(JSON.stringify(data))
    if (cloneData.batchTime && 2 == cloneData.batchTime.length) {
        cloneData.beginTime = formatDate2(cloneData.batchTime[0]);
        cloneData.endTime = formatDate2(cloneData.batchTime[1]);
        delete cloneData.batchTime;
    }
    // console.log('------wrapper------')
    // console.log(cloneData);
    // console.log('------wrapper------')
    return cloneData;
}
