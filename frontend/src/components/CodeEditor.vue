<template>
  <div class="code-editor">
    <div class="header">
      <h3>Code Editor</h3>
      <div class="language-selector">
        <q-select
          v-model="selectedLanguage"
          :options="languageOptions"
          label="Language"
          emit-value
          map-options
          class="language-select"
        />
        <q-btn
          color="primary"
          label="Download Code"
          @click="downloadCode"
          class="download-btn"
        />
      </div>
    </div>
    <div class="editor-container">
      <Editor
        v-model:value="codeContent"
        v-model:language="selectedLanguage"
        :options="editorOptions"
        @change="onEditorChange"
        class="editor"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Editor from 'monaco-editor-vue3'
import { useChatStore } from '../stores/chatStore'

const chatStore = useChatStore()

const codeContent = ref('// Start coding here...')
const selectedLanguage = ref('javascript')
const editorOptions = {
  theme: 'vs-dark',
  automaticLayout: true,
  fontSize: 14,
  minimap: {
    enabled: true
  },
  autoIndent: 'full',
  quickSuggestions: {
    strings: true
  },
  scrollBeyondLastLine: false,
  padding: {
    top: 10
  }
}

const languageOptions = ref([
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' }
])

function downloadCode() {
  const blob = new Blob([codeContent.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `code.${selectedLanguage.value === 'javascript' ? 'js' : selectedLanguage.value}`
  a.click()
  URL.revokeObjectURL(url)
}

function onEditorChange(value:string) {
  codeContent.value = value
}

// Initialize the editor with default content
codeContent.value = '// Start coding here...'
</script>

<style lang="sass">
.code-editor
  height: 100vh
  display: flex
  flex-direction: column

.header
  flex: 0 0 auto
  padding: 16px
  h3
    margin-bottom: 12px

.language-selector
  display: flex
  gap: 16px
  .language-select
    flex-grow: 1
  .download-btn
    min-width: 100px

.editor-container
  flex: 1
  height: 70vh
  overflow: hidden

.editor
  height: 100%
  width: 100%
</style>
