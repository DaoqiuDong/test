import request from '@/utils/request'

// 查询参数列表
export function listConfig(query) {
  return request({
    url: '/api/sysParams/list',
    method: 'post',
    data: query
  })
}

// 查询参数详细
export function getConfig(configId) {
  return request({
    url: '/system/config/' + configId,
    method: 'get'
  })
}

// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  return request({
    url: '/system/config/configKey/' + configKey,
    method: 'get'
  })
}

// 新增参数配置
export function addConfig(data) {
  return request({
    url: '/api/sysParams/add',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateConfig(data) {
  return request({
    url: '/api/sysParams/edit',
    method: 'post',
    data: data
  })
}
export function delConfig(data){
    return request({
      url: '/api/sysParams/del',
      method: 'post',
      data: data
    })
}


// 导出参数
export function exportConfig(query) {
  return request({
    url: '/system/config/export',
    method: 'get',
    params: query
  })
}
