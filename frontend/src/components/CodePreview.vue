<template>
  <div class="code-preview">
    <div class="preview-header">
      <h3>Preview</h3>
      <div class="preview-actions">
        <q-btn
          color="primary"
          label="Download SVG"
          @click="downloadSVG"
          class="action-btn"
        />
        <q-btn
          color="secondary"
          label="Copy SVG"
          @click="copySVG"
          class="action-btn"
        />
      </div>
    </div>
    <div class="preview-container">
      <div v-if="svgContent" class="meta-tags">
        <meta :name="metaName" :content="metaContent">
      </div>
      <iframe
        v-if="svgContent"
        :srcdoc="svgContent"
        frameborder="0"
        scrolling="no"
        allowfullscreen
        class="preview-iframe"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMeta } from '@vueuse/head'
import { useClipboard } from '@vueuse/core'

const props = defineProps({
  svgContent: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'SVG Preview'
  }
})

const emit = defineEmits(['download', 'copy'])

const meta = useMeta()
const clipboard = useClipboard()

// Set meta tags for preview
const metaName = ref('viewport')
const metaContent = computed(() => {
  return `width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no`
})

// Download SVG functionality
function downloadSVG() {
  const svgBlob = new Blob([props.svgContent], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(svgBlob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.title || 'untitled'}.svg`
  a.click()
  URL.revokeObjectURL(url)
  emit('download')
}

// Copy SVG content to clipboard
function copySVG() {
  clipboard.write(props.svgContent)
  emit('copy')
}

// Initialize meta tags when mounted
onMounted(() => {
  meta.title.value = props.title
})
</script>

<style lang="sass">
.code-preview
  display: flex
  flex-direction: column
  height: 100vh
  gap: 16px

.preview-header
  flex: 0 0 auto
  padding: 16px
  display: flex
  justify-content: space-between
  align-items: center
  h3
    margin: 0

.preview-actions
  display: flex
  gap: 8px
  .action-btn
    padding: 6px 12px

.preview-container
  flex: 1
  width: 100%
  overflow: hidden

.meta-tags
  position: absolute
  visibility: hidden

.preview-iframe
  width: 100%
  height: 100%
  border: none
  background: transparent
  display: flex
  justify-content: center
  align-items: center
</style>
