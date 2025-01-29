<template>
  <q-card class="editor-component">
    <q-card-section class="row q-gutter-md">
      <!-- Code Editor -->
      <div class="col">
        <q-card class="code-editor">
          <q-card-section>
            <div class="text-h6">Code Editor</div>
            <q-separator class="q-mb-md" />
            <q-scroll-area style="height: 300px;">
              <q-textarea
                v-model="code"
                placeholder="Enter your SVG code here..."
                class="code-input"
                filled
                autogrow
              />
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>

      <!-- Preview -->
      <div class="col">
        <q-card class="preview">
          <q-card-section>
            <div class="text-h6">Preview</div>
            <q-separator class="q-mb-md" />
            <q-scroll-area style="height: 300px;">
              <div class="preview-content">
                <pre v-highlightjs><code>{{ code }}</code></pre>
              </div>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const code = ref(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="80" height="80" fill="#f0f0f0" />
  <circle cx="50" cy="50" r="40" fill="#4f46e5" opacity="0.5" />
</svg>
`);
</script>

<style lang="scss" scoped>
.editor-component {
  width: 100%;
  height: 100%;
  padding: 16px;
}

.code-editor, .preview {
  height: 100%;
}

.code-input {
  resize: none;
}

.preview-content {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

::v-deep(.hljs) {
  padding: 0.5em;
  background: #f0f0f0;
}
</style>
