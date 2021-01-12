import { login, logout } from '@/api/user'
// , getInfo
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

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
    // const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        // commit('SET_TOKEN', response.token)
        // commit('SET_AVATAR', response.userInfo.avatarPath)
        // commit('SET_NAME', response.user.username)
        setToken(response.data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      //   if (!response.data) {
      //     // eslint-disable-next-line prefer-promise-reject-errors
      //     reject('Verification failed, please Login again.')
      //   }

      //   // roles must be a non-empty array
      //   if (!response.roles || response.roles.length <= 0) {
      //     // eslint-disable-next-line prefer-promise-reject-errors
      //     reject('getInfo: roles must be a non-null array!')
      //   }

      //   response = {
      //     acatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      //     introduction: 'I am a super administrator',
      //     name: 'Super Admin',
      //     roles: ['admin']
      //   }

      //   commit('SET_ROLES', response.roles)
      //   commit('SET_NAME', response.name)
      //   commit('SET_AVATAR', response.avatar)
      //   commit('SET_INTRODUCTION', response.introduction)
      //   resolve(response)
      // }).catch(error => {
      //   reject(error)
      // })

      const response = {
        acatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        introduction: 'I am a super administrator',
        name: 'Super Admin',
        roles: ['admin']
      }
      if (response) {
        commit('SET_ROLES', response.roles)
        commit('SET_NAME', response.name)
        commit('SET_AVATAR', response.avatar)
        commit('SET_INTRODUCTION', response.introduction)
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
