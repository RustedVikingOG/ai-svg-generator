import { defineStore } from 'pinia'
import type { IMessage } from 'src/types/svgTypes'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as IMessage[],
    selectedModel: 'gpt-3.5'
  }),

  actions: {
    addMessage(message: IMessage) {
      this.messages.push(message)
    },

    clearChat() {
      this.messages = []
    }
  }
})
