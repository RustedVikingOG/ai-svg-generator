import { defineStore } from 'pinia'

export const useSVGStore = defineStore('svg', {
  state: () => ({
    code: '',
    tabs: [] as string[],
    currentTab: 'main'
  }),

  actions: {
    setCode(newCode: string) {
      this.code = newCode
    },

    addTab(tabName: string) {
      if (!this.tabs.includes(tabName)) {
        this.tabs.push(tabName)
      }
    },

    switchTab(tabName: string) {
      this.currentTab = tabName
    }
  }
})
