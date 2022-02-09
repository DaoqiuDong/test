import request from '@/utils/request'

// 查询字典类型列表
export function listType(query) {
  return request({
    url: '/api/dict/list',
    method: 'post',
    data: query
  })
}
export function mine(){
  return request({
    url: '/api/dict/mine',
    method: 'post',
    // data: query
  })
}

// 查询字典类型详细
export function getType(dictId) {
  return request({
    url: '/api/dict/mine',
    method: 'POST'
  })
}

// 新增字典类型
export function addType(data) {
  return request({
    url: '/api/dict/add',
    method: 'post',
    data: data
  })
}

// 修改字典类型
export function updateType(data) {
  return request({
    url: '/api/dict/edit',
    method: 'post',
    data: data
  })
}

// 删除字典类型
export function delType(data) {
  return request({
    url: '/api/dict/del',
    method: 'post',
    data:data
  })
}

// 导出字典类型
export function exportType(query) {
  return request({
    url: '/system/dict/type/export',
    method: 'get',
    params: query
  })
}

// 获取字典选择框列表
export function optionselect() {
  return request({
    url: '/system/dict/type/optionselect',
    method: 'get'
  })
}
