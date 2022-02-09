import request from '@/utils/request'

// 查询字典数据列表
export function listData(query) {
  return request({
    url: '/api/dictDetail/list',
    method: 'POST',
    data: query
  })
}

// 查询字典数据详细
export function getData(dictCode) {
  return request({
    url: '/system/dict/data/' + dictCode,
    method: 'get'
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request({
    url: '/system/dict/data/dictType/' + dictType,
    method: 'get'
  })
}

// 新增字典数据
export function addData(data) {
  return request({
    url: '/api/dictDetail/add',
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function updateData(data) {
  return request({
    url: '/api/dictDetail/edit',
    method: 'POST',
    data: data
  })
}

// 删除字典数据
export function delData(data) {
  return request({
    url: '/api/dictDetail/del',
    method: 'POST',
    data:data
  })
}

// 导出字典数据
export function exportData(query) {
  return request({
    url: '/system/dict/data/export',
    method: 'get',
    params: query
  })
}
