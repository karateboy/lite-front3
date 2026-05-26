import axios from 'axios'
import {MonitorState} from './types'
import {RootState} from '../types'
import {GetterTree, ActionTree, MutationTree, Module} from 'vuex'
import {Monitor} from "@/types";

const namespaced: boolean = true
export const state: MonitorState = {
  monitors: Array<Monitor>(),
  activeID: 'me',
}

const getters: GetterTree<MonitorState, RootState> = {
  mMap(state: MonitorState): Map<string, Monitor> {
    const map = new Map<string, Monitor>()
    for (const m of state.monitors) {
      map.set(m._id, m)
    }
    return map
  },
}

const actions: ActionTree<MonitorState, RootState> = {
  async fetchMonitors({commit}) {
    try {
      const res = await axios.get('/Monitors')
      if (res.status === 200) {
        commit('setMonitors', res.data)
      }
    } catch (err) {
      throw new Error('error at fetchMonitors')
    }
  },
  async getActiveID({commit}) {
    try {
      const res = await axios.get('/ActiveMonitor')
      if (res.status === 200) {
        commit('setActiveID', res.data)
      }
    } catch (err) {
      throw new Error('error at getActiveID')
    }
  },
  async setActiveID({commit}, id: string) {
    try {
      const res = await axios.put(`/ActiveMonitor/${id}`, {})
      if (res.status == 200) {
        commit('setActiveID', id)
      }
    } catch (err) {
      throw new Error('error at setActiveID')
    }
  },
}

const mutations: MutationTree<MonitorState> = {
  setMonitors(state: MonitorState, val: Array<Monitor>) {
    state.monitors = val
  },
  setActiveID(state: MonitorState, val: string) {
    state.activeID = val
  },
}

export const monitors: Module<MonitorState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}
