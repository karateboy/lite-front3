import axios from 'axios'
import {User} from '@/types'
import {UserState} from "@/store/user/types";
import {ActionTree, Module, MutationTree} from "vuex";
import {RootState} from "@/store/types";

const namespaced: boolean = true
export const state: UserState = {
  login: false,
  userInfo: {
    _id: '',
    name: '',
    phone: '',
    isAdmin: false,
    group: '',
    monitorTypeOfInterest: [],
    windField: false,
  }
}
const getters = {}
const actions: ActionTree<UserState, RootState> = {
  async getUserInfo({commit, state}) {
    try {
      const res = await axios.get(`/User/${state.userInfo._id}`)
      const payload = res && res.data
      commit('setUserInfo', payload)
    } catch (err) {
      console.error(err)
    }
  }
}

const mutations: MutationTree<UserState> = {
  setUserInfo(state, val: User) {
    state.userInfo._id = val._id
    state.userInfo.name = val.name
    state.userInfo.isAdmin = val.isAdmin
    state.userInfo.group = val.group
    state.userInfo.monitorTypeOfInterest = val.monitorTypeOfInterest
    state.userInfo.windField = val.windField
  },
  setLogin(state, val) {
    state.login = val
  },
}

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}
