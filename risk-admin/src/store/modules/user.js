import {
  apiLogin,
  logout } from '@/api/user'
// , getInfo
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { error } from '@/utils/notice'

function handlePermiss (arr) {
  return arr.map(item => {
    return item.permissionName
  })
}

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    let token = '1'
    console.log(token)
    setToken(token)
    return new Promise((resolve, reject) => {
      apiLogin(userInfo).then(response => {
        // commit('SET_ROLES', handlePermiss(response.data.permissionList))
        console.log(response)
        if (response.data.permissionList.length > 0) {
          window.localStorage.setItem('roles', JSON.stringify(handlePermiss(response.data.permissionList)))
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        } else {
          error('没有权限')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      const response = {
        roles: JSON.parse(window.localStorage.getItem('roles'))
      }

      if (response) {
        commit('SET_ROLES', response.roles)
        resolve(response)
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('error')
      }
    })
  },

  // user logout
  logout ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles ({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
