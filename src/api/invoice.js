import request from '@/utils/request'
import { formatDate2 } from '@/utils'


// 查询开票列表
export function listInvoiced(query) {
    return request({
        url: '/api/invoice/listInvoiced',
        method: 'post',
        data: wrapper(query)
    })
}

// 查询未开票列表
export function listUnbilled(query) {
    return request({
        url: '/api/invoice/listUnbilled',
        method: 'post',
        data: wrapper(query)
    })
}

// 查询开票统计列表
export function statistics(query) {
    return request({
        url: '/api/invoice/statistics',
        method: 'post',
        data: wrapper(query)
    })
}

export function statisticsExportList(query) {
    return request({
        url: '/api/invoice/statisticsExportList',
        method: 'post',
        data: wrapper(query)
    })
}

// 查询开票统计列表
export function invoicedExportList(query) {
    return request({
        url: '/api/invoice/invoicedExportList',
        method: 'post',
        data: wrapper(query)
    })
}


// 修改开票
export function updateInvoice(data) {
    return request({
        url: '/api/invoice/edit',
        method: 'post',
        data: data
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

