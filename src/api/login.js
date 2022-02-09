import request from '@/utils/request'
import md5 from 'js-md5'

// 登录方法
export function login(username, password, code, uuid) {
  console.log('login')
  const data = {
    username,
    password,
    code,
    uuid
  }
  const secret = btoa(`${username}:${md5(password)}`);
  // console.log(secret)
  return request({
    url: '/oauth/token?grant_type=client_credentials',
    method: 'post',
    // params: data
    headers: { 'Authorization': `Basic ${secret}` }
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/api/userInfo/mine',
    method: 'post'
  })
}
export function loginJouranl() {
  return request({
    url: '/api/userInfo/journal',
    method: 'post'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
// export function getCodeImg() {
//   return request({
//     url: '/captchaImage',
//     method: 'get'
//   })
// }
