import request from '@/utils/request'

// 查询部门列表
export function list(data) {
  return request({
    url: '/api/branchInfo/list',
    method: 'post',
    data: data
  })
}
export function mine() {
  return request({
    url: '/api/branchInfo/mine',
    method: 'post',
  })
}

// 查询部门详细
export function getDept(deptId) {
  return request({
    url: '/system/dept/' + deptId,
    method: 'get'
  })
}

// 查询部门下拉树结构
export function treeselect() {
  return request({
    url: '/api/branchInfo/treeselect',
    method: 'POST'
  })
}

// 根据角色ID查询部门树结构
export function roleDeptTreeselect(roleId) {
  return request({
    url: '/system/dept/roleDeptTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增部门
export function addDept(data) {
  return request({
    url: '/api/branchInfo/add',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept(data) {
  return request({
    url: '/api/branchInfo/edit',
    method: 'post',
    data: data
  })
}

// 删除部门
export function delDept(deptId) {
  return request({
    url: '/api/branchInfo/del/' + deptId,
    method: 'post'
  })
}

// CFCA注册
export function CFCARegistry(data) {
  return request({
    url: '/api/branchInfo/cfcaRegistry',
    method: 'post',
    data: data
  })
}
