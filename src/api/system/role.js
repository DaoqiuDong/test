import request from '@/utils/request'

// 查询角色列表
export function listRole(data) {
  return request({
    url: '/api/roleCode/list',
    method: 'post',
    data: data
  })
}

// 查询角色详细
export function getRole(roleId) {
  return request({
    url: '/api/roleCode/get/' + roleId,
    method: 'POST'
  })
}

export function getAllRole(){
  return request({
    url: '/api/roleCode/getAll',
    method: 'POST'
  })
}

// 新增角色
export function addRole(data) {

  return request({
    url: '/api/roleCode/add',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/api/roleCode/edit',
    method: 'post',
    data: data
  })
}

// 角色数据权限
export function dataScope(data) {
  return request({
    url: '/system/role/dataScope',
    method: 'put',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  const data = {
    id: roleId,
    status: status
  }
  console.log(roleId, status)
  console.log(data)
  return request({
    url: '/api/roleCode/changeStatus',
    method: 'post',
    data: data
  })
}

// 删除角色
export function delRole(roleId) {
  return request({
    url: '/api/roleCode/del/' + roleId,
    method: 'post'
  })
}

// 导出角色
export function exportRole(query) {
  return request({
    url: '/system/role/export',
    method: 'get',
    params: query
  })
}
