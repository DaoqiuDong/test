import request from '@/utils/request'
import { formatDate2 } from '@/utils'

function wrapper(data) {
    const cloneData = JSON.parse(JSON.stringify(data))
    if (cloneData.batchTime && 2 == cloneData.batchTime.length) {
        cloneData.beginTime = formatDate2(cloneData.batchTime[0]);
        cloneData.endTime = formatDate2(cloneData.batchTime[1]);
        delete cloneData.batchTime;
    }
    return cloneData;
}

export function updateStatus(data) {
    return request({
        url: '/api/reconciliation/updateStatus',
        method: 'post',
        data: data
    })
}
export function terminalBill(query) {
    return request({
        url: '/api/reconciliation/bill',
        method: 'post',
        data: wrapper(query)
    })
}
export function listStatement(query) {
    return request({
        url: '/api/reconciliation/list',
        method: 'post',
        data: wrapper(query)
    })
}

export function stattementExportList(query) {
    return request({
        url: '/api/reconciliation/listExport',
        method: 'post',
        data: wrapper(query)
    })
}
