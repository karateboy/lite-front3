import axios from 'axios'
import {MonitorTypeState} from './types'
import {RootState} from '../types'
import {GetterTree, ActionTree, MutationTree, Module} from 'vuex'

const namespaced: boolean = true
export const state: MonitorTypeState = {
  monitorTypes: []
}

const getters: GetterTree<MonitorTypeState, RootState> = {
  mtMap(state) {
    const map = new Map()
    for (const mt of state.monitorTypes) {
      map.set(mt._id, mt)
    }
    return map
  },
  activatedMonitorTypes(state) {
    return state.monitorTypes.filter(mt => mt.measuringBy)
  },
}
const actions: ActionTree<MonitorTypeState, RootState> = {
  async fetchMonitorTypes({commit}) {
    try {
      const res = await axios.get('/MonitorType')
      const payload = res && res.data
      commit('updateMonitorTypes', payload)
    } catch (err) {
      console.error(err)
    }
  },
}

const mutations : MutationTree<MonitorTypeState> = {
  updateMonitorTypes(state, val) {
    state.monitorTypes = val
  },
}

export const monitorTypes: Module<MonitorTypeState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}
