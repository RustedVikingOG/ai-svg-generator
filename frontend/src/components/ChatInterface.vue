<template>
  <div class="chat-interface">
    <div class="toolbar">
      <q-toolbar>
        <q-btn-group>
          <q-btn
            color="primary"
            icon="search"
            @click="toggleSearch"
          />
          <q-btn
            color="primary"
            icon="refresh"
            @click="clearChat"
          />
        </q-btn-group>
        <q-space />
        <q-select
          v-model="selectedModel"
          :options="models"
          label="Model"
          emit-value
          map-options
        />
      </q-toolbar>
    </div>

    <div class="chat-messages" v-chat-scroll>
      <q-chat-message
        v-for="message in messages"
        :key="message.id"
        :text="[message.text]"
        :sent="message.sender === 'user'"
        :bg-color="message.sender === 'user' ? 'primary' : 'grey'"
        text-color="white"
      />
    </div>

    <div class="input-area">
      <q-input
        v-model="newMessage"
        type="textarea"
        label="Type your message..."
        clearable
        @keydown.enter.prevent="sendMessage"
      />
      <q-btn
        color="primary"
        icon="send"
        @click="sendMessage"
        :loading="isLoading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatStore } from '../stores/chatStore'
import type { IMessage } from 'src/types/svgTypes'

const chatStore = useChatStore()

const messages = computed(() => chatStore.messages)
const selectedModel = computed({
  get() {
    return chatStore.selectedModel
  },
  set(value) {
    chatStore.selectedModel = value
  }
})

const newMessage = ref('')
const isLoading = ref(false)

const models = ref([
  { label: 'GPT-3.5', value: 'gpt-3.5' },
  { label: 'Claude', value: 'claude' },
  // Add more models as needed
])

async function sendMessage() {
  if (!newMessage.value.trim()) return

  isLoading.value = true
  try {
    const newMsg: IMessage = {
      id: Date.now(),
      text: newMessage.value,
      sender: 'user',
      timestamp: new Date().toISOString()
    }

    chatStore.addMessage(newMsg)
    newMessage.value = ''

    // Simulate AI response (replace with actual API call)
    const response = await fakeAIResponse(newMsg.text)
    const aiMsg: IMessage = {
      id: Date.now(),
      text: response,
      sender: 'ai',
      timestamp: new Date().toISOString()
    }
    chatStore.addMessage(aiMsg)
  } catch (error) {
    console.error('Error sending message:', error)
  } finally {
    isLoading.value = false
  }
}

function fakeAIResponse(prompt: string): Promise<string> {
  // Simulate API call - replace with actual API implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`AI Response to: ${prompt}`)
    }, 1000)
  })
}

function toggleSearch() {
  // Handle search functionality
}

function clearChat() {
  chatStore.clearChat()
}
</script>

<style lang="sass">
.chat-interface
  height: 100vh
  display: flex
  flex-direction: column

.toolbar
  flex: 0 0 auto

.chat-messages
  flex: 1
  overflow-y: auto
  padding: 16px

.input-area
  flex: 0 0 auto
  padding: 16px
  display: flex
  gap: 8px

.q-input
  flex-grow: 1
</style>
