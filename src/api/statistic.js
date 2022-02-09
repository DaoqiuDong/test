import request from '@/utils/request'

export function statistic() {
    return request({
        url: '/api/statistic/get',
        method: 'post',
    })
}
