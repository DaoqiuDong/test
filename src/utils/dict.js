import request from '@/utils/request'

export function mine(dictType) {
    return request({
        url: '/api/dictDetail/mine/' + dictType,
        method: 'post'
    })
}
