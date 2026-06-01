import axios from 'axios'
import {User} from '@/types'
import { defineStore } from 'pinia'

interface State {
  login: boolean,
  userInfo: User
}

export const useUserStore = defineStore('userStore', {
  // 转换为函数
  state: (): State => ({
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
  }),
  getters: {},
  actions: {
    async getUserInfo() {
      try {
        const res = await axios.get(`/User/${this.userInfo._id}`)
        if(res.status === 200) {
          this.userInfo = res.data.data
        }
      } catch (err) {
        console.error(err)
      }
    }
  },
})
