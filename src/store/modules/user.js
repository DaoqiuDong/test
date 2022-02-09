import { login, logout, getInfo, loginJouranl } from '@/api/login'
import { getToken, setToken, removeToken, setKulunToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    OauthLogin({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      // console.log('request')
      return new Promise((resolve, reject) => {
        // console.log('call login')
        login(username, password, code, uuid).then(res => {
          console.log('user.js OauthLogin response')
          console.log(res)
          if (401 === res) {
            console.log('reject it')
            reject(res)
          } else {
            setToken(res.access_token)
            commit('SET_TOKEN', res.access_token)
            // getKulunToken().then(response => {
            //   console.log('kulun login')
            //   console.log(response)
            //   if (0 === response.errcode) {
            //     const kulunToken = response.data.token
            //     console.log(kulunToken)
            //     setKulunToken(kulunToken)
            //     resolve()
            //   } else {
            //     this.message.error(`登录失败 【${response.errcode} - ${response.errmsg}】`)
            //     reject(`登录失败 【${response.errcode} - ${response.errmsg}】`)
            //   }
            // })

              loginJouranl().then(jr => {console.log(jr)})
            resolve()
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(res => {
          const user = res
          const avatar = user.avatar == "" ? require("@/assets/image/profile.png") : '/avatar/' + user.account + ".png";
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          // } else {
          //   commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.nickName)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
