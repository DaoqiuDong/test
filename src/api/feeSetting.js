import request from '@/utils/request'

// 查询阶梯计费列表
export function listFeeSetting(query) {
    return request({
        url: '/api/freeSetting/list',
        method: 'post',
        data: query
    })
}


// 新增阶梯计费配置
export function addFeeSetting(data) {
    return request({
        url: '/api/freeSetting/add',
        method: 'post',
        data: data
    })
}

// 修改阶梯计费配置
export function updateFeeSetting(data) {
    return request({
        url: '/api/freeSetting/edit',
        method: 'post',
        data: data
    })
}
export function delFeeSetting(data){
    return request({
        url: '/api/freeSetting/del',
        method: 'post',
        data: data
    })
}
