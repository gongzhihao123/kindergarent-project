import Vue from 'vue'
import Vuex from 'vuex'
import service from '@/api/index'
import { error } from '@/utils/index'

Vue.use(Vuex)
const server = service.serverManage

export default new Vuex.Store({
  state: {
    user: '',
    noticeNav: ''
  },
  mutations: {
    setUser (state, data) {
      state.user = data
    },
    saveNoticeNav (state, data) {
      state.noticeNav = data
    }
  },
  actions: {
    // 登录
    async login ({ commit }, data) {
      const res = await server.login(data)
      return res
    },
    async ces ({ commit }, data) {
      const res = await server.ces(data)
      return res
    },
    async departmentList ({ commit }, data) {
      const res = await server.departmentList(data)
      if (res.code !== 1) {
        error(res.message)
      } else {
        return res.data
      }
    },
    async deleteDepartment ({ commit }, data) {
      const res = await server.deleteDepartment(data)
      return res
    },
    async editDepartment ({ commit }, data) {
      const res = await server.editDepartment(data)
      if (res.code !== 1) {
        error(res.message)
      } else {
        return res
      }
    },
    async addDepartment ({ commit }, data) {
      const res = await server.addDepartment(data)
      if (res.code !== 1) {
        error(res.message)
      } else {
        return res
      }
    },
    async addStructureUser ({ commit }, data) {
      const res = await server.addStructureUser(data)
      if (res.code !== 1) {
        error(res.message)
      } else {
        return res
      }
    },
    async editStructureUser ({ commit }, data) {
      const res = await server.editStructureUser(data)
      if (res.code !== 1) {
        error(res.message)
      } else {
        return res
      }
    },
    async reastStructurePassword ({ commit }, data) {
      const res = await server.reastStructurePassword(data)
      if (res.code !== 1) {
        error(res.message)
      } else {
        return res
      }
    },
    async prohibitStructureUser ({ commit }, data) {
      const res = await server.prohibitStructureUser(data)
      if (res.code !== 1) {
        error(res.message)
      } else {
        return res
      }
    }
  }
})
