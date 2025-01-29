import { defineStore } from 'pinia'
import type { IHistoryEntry } from 'src/types/svgTypes'

export const useHistoryStore = defineStore('history', {
  state: () => ({
    attempts: [] as IHistoryEntry[],
    currentAttempt: null as IHistoryEntry | null
  }),

  actions: {
    addAttempt(entry: IHistoryEntry) {
      this.attempts.push(entry)
    },

    selectAttempt(entry: IHistoryEntry) {
      this.currentAttempt = entry
    }
  }
})
