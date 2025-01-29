<template>
  <div class="history-display">
    <div class="header">
      <h2>Chat History</h2>
      <div class="search-container">
        <q-input
          v-model="searchQuery"
          label="Search messages..."
          clearable
          class="search-input"
        />
        <q-select
          v-model="selectedModel"
          :options="models"
          label="Filter by model"
          emit-value
          map-options
          class="model-filter"
        />
      </div>
    </div>

    <div class="history-list" v-chat-scroll>
      <div v-if="loading">
        <q-skeleton class="message-skeleton" v-for="n in 5" :key="n" />
      </div>

      <div
        v-else
        class="message-card"
        v-for="message in filteredMessages"
        :key="message.id"
      >
        <div class="message-header">
          <div class="model-badge">
            {{ message.model }}
          </div>
          <div class="timestamp">
            {{ new Date(message.timestamp).toLocaleDateString() }}
          </div>
        </div>
        <div class="message-content">
          <div class="prompt">
            <q-item-label class="text-weight-bold">You:</q-item-label>
            {{ message.userPrompt }}
          </div>
          <div class="response">
            <q-item-label class="text-weight-bold">AI:</q-item-label>
            {{ message.aiResponse }}
          </div>
        </div>
      </div>

      <div v-if="filteredMessages.length === 0" class="no-messages">
        No messages found matching your criteria
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatStore } from '../stores/chatStore'
// import { QChatScroll } from 'quasar'

const chatStore = useChatStore()

const searchQuery = ref('')
const selectedModel = ref('all')
const loading = ref(false)

const models = ref([
  { label: 'All Models', value: 'all' },
  { label: 'GPT-3.5', value: 'gpt-3.5' },
  { label: 'Claude', value: 'claude' }
  // Add more models as needed
])

const filteredMessages = computed(() => {
  return chatStore.history
    .filter(message => {
      const matchesSearch = message.userPrompt.toLowerCase().includes(
        searchQuery.value.toLowerCase()
      ) ||
        message.aiResponse.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesModel = selectedModel.value === 'all' ||
        message.model === selectedModel.value

      return matchesSearch && matchesModel
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
})

async function loadHistory() {
  loading.value = true
  try {
    // Add actual history loading logic here
    // This is just a simulation
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    console.error('Error loading history:', error)
  } finally {
    loading.value = false
  }
}

// Load history when component mounts
loadHistory()
</script>

<style lang="sass">
.history-display
  height: 100vh
  display: flex
  flex-direction: column

.header
  flex: 0 0 auto
  padding: 16px
  h2
    margin-bottom: 16px

.search-container
  display: flex
  gap: 16px
  .search-input
    flex-grow: 1
  .model-filter
    min-width: 150px

.history-list
  flex: 1
  overflow-y: auto
  padding: 16px

.message-card
  background: white
  border-radius: 8px
  padding: 16px
  margin-bottom: 16px
  box-shadow: 0 2px 4px rgba(0,0,0,0.1)
  .message-header
    display: flex
    justify-content: space-between
    margin-bottom: 12px
    .model-badge
      background: $primary
      color: white
      padding: 4px 8px
      border-radius: 4px
      font-size: 0.8em
    .timestamp
      color: $grey-6
      font-size: 0.8em

.message-content
  .prompt
    margin-bottom: 8px
  .response
    margin-top: 4px
  .text-weight-bold
    font-weight: 500
    color: $grey-8

.no-messages
  text-align: center
  color: $grey-6
  padding: 16px

.message-skeleton
  margin-bottom: 16px
  padding: 16px
  background: white
  border-radius: 8px
</style>
