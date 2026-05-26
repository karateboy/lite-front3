import {createStore, StoreOptions} from 'vuex'

// Modules
import {monitorTypes} from './monitorTypes'
import {monitors} from './monitors'
import {monitorTypeGroups} from '@/store/monitorTypeGroups'
import {user} from './user'
import {tables} from './tables'
import {RootState} from './types'

const store: StoreOptions<RootState> = {
  state: {
    isLoading: false,
    loadingMessage: '...',
    login: false,
  },
  mutations: {
    setLoading(state: any, param: any) {
      const {loading, message} = param
      state.isLoading = loading
      if (message) state.loadingMessage = message
    },
    setLogin(state: any, login: any) {
      state.login = login
    },
  },
  modules: {
    monitorTypes,
    monitors,
    monitorTypeGroups,
    user,
    tables,
  }
}
export default createStore<RootState>(store)
