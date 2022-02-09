import request from '@/utils/request'


// 查询公告列表
export function listNotice(query) {
    return request({
        url: '/api/notice/list',
        method: 'post',
        data: query
    })
}

// 新增公告
export function addNotice(data) {
    return request({
        url: '/api/notice/add',
        method: 'post',
        data: data
    })
}

// 修改公告
export function updateNotice(data) {
    return request({
        url: '/api/notice/edit',
        method: 'post',
        data: data
    })
}
export function delNotice(data){
    return request({
        url: '/api/notice/del',
        method: 'post',
        data: data
    })
}
