import request from '@/utils/request'
import {formatDate2} from "../utils";

export function getList(data) {
    return request({
        url: '/api/project/list',
        method: 'post',
        data: wrapper(data)
    })
}
export function getExportList(data) {
    return request({
        url: '/api/project/exportList',
        method: 'post',
        data: wrapper(data)
    })
}
export function getPendingList(data) {
    return request({
        url: '/api/project/pendingList',
        method: 'post',
        data: wrapper(data)
    })
}

export function getPendingExportList(data) {
    return request({
        url: '/api/project/pendingExportList',
        method: 'post',
        data: wrapper(data)
    })
}
export function getApprovedList(data) {
    return request({
        url: '/api/project/approvedList',
        method: 'post',
        data: wrapper(data)
    })
}
export function getApprovedExportList(data) {
    return request({
        url: '/api/project/approvedExportList',
        method: 'post',
        data: wrapper(data)
    })
}


export function getArchivesList(data) {
    return request({
        url: '/api/project/archivesList',
        method: 'post',
        data: wrapper(data)
    })
}

export function getFileList(projectId, requestId, applyId) {
    return request({
        url: `/api/fileList/get/${projectId}/${requestId}/${applyId}`,
        method: 'post',
        // data: wrapper(data)
    })
}

export function getGL(file) {
    return request({
        url: `/api/project/getGL/${file}`,
        method: 'post',
    })
}
export function getGuaranteeLetter(projectId) {
    return request({
        url: `/api/guaranteeLetter/get/${projectId}`,
        method: 'post',
    })
}

export function projectHistory(processInstanceId) {
    return request({
        url: `/api/project/history/${processInstanceId}`,
        method: 'post',
    })
}

export function getPdf(id, file) {
    return request({
        url: `/api/project/pdf/${id}/${file}`,
        method: 'post',
    })
}

export function getPdf2(id, file) {
    return request({
        url: `/api/project/pdf2/${id}/${file}`,
        method: 'post',
    })
}

export function approval(data) {
    return request({
        url: '/api/project/approval',
        method: 'post',
        data: data
    })
}
export function archivedPdf(id) {
    return request({
        url: `/api/archive/glpdf/${id}`,
        method: 'post',
    })
}
function wrapper(data) {
    // console.log(cloneData)
    // console.log('data=',data);
    const cloneData = JSON.parse(JSON.stringify(data))
    // console.log('cloneData=',cloneData)
    if (cloneData.applyTimes) {
        cloneData.applyStart = formatDate2(cloneData.applyTimes[0])
        cloneData.applyDue = formatDate2(cloneData.applyTimes[1])
        delete(cloneData.applyTimes)
    }
    if (cloneData.paymentTimes) {
        cloneData.paymentStart = formatDate2(cloneData.paymentTimes[0])
        cloneData.paymentDue = formatDate2(cloneData.paymentTimes[1])
        delete(cloneData.paymentTimes)
    }

    if (cloneData.auditTimes) {
        cloneData.auditStart = formatDate2(cloneData.auditTimes[0])
        cloneData.auditDue = formatDate2(cloneData.auditTimes[1])
        delete(cloneData.auditTimes)
    }
    if (cloneData.guaranteeAtTimes) {
        cloneData.guaranteeAtStart = formatDate2(cloneData.guaranteeAtTimes[0])
        cloneData.guaranteeAtDue = formatDate2(cloneData.guaranteeAtTimes[1])
        delete(cloneData.guaranteeAtTimes)
    }
    if (cloneData.bidOpenAtTimes) {
        cloneData.bidOpenAtStart = formatDate2(cloneData.bidOpenAtTimes[0])
        cloneData.bidOpenAtDue = formatDate2(cloneData.bidOpenAtTimes[1])
        delete(cloneData.bidOpenAtTimes)
    }

    // console.log(cloneData)
    return cloneData;
}

