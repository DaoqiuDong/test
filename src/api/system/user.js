import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/bohotec.com";


// 查询用户列表
export function listUser(data) {
  return request({
    url: '/api/userInfo/list',
    method: 'post',
    data: data
  })
  // return new Promise(res => {
  //   return {
  //     code: 200, message: 'OK', data: []
  //   }
  // })
}

export function mine() {
  return request({
    url: '/api/userInfo/mine',
    method: 'post'
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: '/system/user/' + praseStrEmpty(userId),
    method: 'get'
  })
}
export function getSelectUserRole(account){
  return request({
    url: '/api/userRole/getRole/' + account,
    method: 'POST'
  })
}
// 新增用户
export function addUser(data) {
  return request({
    url: '/api/userInfo/add',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/api/userInfo/edit',
    method: 'post',
    data: data
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/api/userInfo/updateUserProfile',
    method: 'post',
    data: data
  })
}
// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/api/userInfo/updateUserPwd',
    method: 'POST',
    data: data
  })
}

// 验证旧密码
export function checkOldPassword(oldPassword) {
  const data = {
    oldPassword
  }
  return request({
    url: '/api/userInfo/checkOldPassword',
    method: 'POST',
    data: data
  })
}
// 删除用户
export function delUser(userId,branchId) {
  return request({
    url: '/api/userInfo/del/' + userId+'/' + branchId,
    method: 'post'
  })
}

// 导出用户
export function exportUser(query) {
  return request({
    url: '/system/user/export',
    method: 'get',
    params: query
  })
}

// 用户密码重置
export function resetUserPwd(id, branchId,secret) {
  const data = {
    id,
    branchId,
    secret
  }
  return request({
    url: '/api/userInfo/resetUserPwd',
    method: 'post',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/api/userInfo/changeStatus',
    method: 'POST',
    data: data
  })
}

// 查询用户测点权限信息
export function getUserAuthority(account) {
  const data = {
    account
  }
  return request({
    url: '/api/monitoringPointAuthority/list',
    method: 'POST',
    data:data
  })
}

export function addMonitoringAuthority(data){
  return request({
    url: '/api/monitoringPointAuthority/add',
    method: 'POST',
    data:data
  })
}

export function removeAuthority(data) {
  return request({
    url: '/api/monitoringPointAuthority/delete',
    method: 'post',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data,headers) {
  console.log('uploadAvatar=',data);
  return request({
    headers: headers,
    url: '/api/fileUpload/uploadUserAvatar',
    method: 'post',
    data: data
  })
}

// 下载用户导入模板
export function importTemplate() {
  return request({
    url: '/system/user/importTemplate',
    method: 'get'
  })
}
