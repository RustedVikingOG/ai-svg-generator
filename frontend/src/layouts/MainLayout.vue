<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-toolbar class="text-white rounded">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          SVG Generator
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-page-container class="page-container">
      <q-page class="history" v-if="leftDrawerOpen">
        <q-card
          show-if-above
          bordered
        >
          <HistoryDisplay />
        </q-card>
      </q-page>

      <q-page class="chat" :width="compWidth">
        <ChatInterface />
      </q-page>

      <q-page class="editor" :width="compWidth">
        <EditorComponent />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HistoryDisplay from '../components/HistoryDisplay.vue';
import ChatInterface from '../components/ChatInterface.vue';
import EditorComponent from '../components/EditorComponent.vue';



const leftDrawerOpen = ref(false);
let compWidth = '45vw'
function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
  compWidth = leftDrawerOpen.value? '40vw' : '45vw'
}
</script>


<style lang="scss" scoped>
@import '../css/quasar.variables.scss';

.q-layout__section--marginal {
  background-color: $dark-page;
}

.page-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
}

.history {
  width: 10vw;
}

.chat {
  width: 40vw;
}

.editor {
  width: 40vw;
}
</style>
