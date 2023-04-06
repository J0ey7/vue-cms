<template>
  <div class="menu">
    <page-content
      :contentConfig="MenuContentConfig"
      :pageName="'Menu'"
      ref="pageContentRef"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { PageSearch, pageContent } from '@/shared/components'
import { MenuContentConfig } from './config/page_config'

export default defineComponent({
  name: 'menu',
  components: {
    pageContent
  },
  setup() {
    return { MenuContentConfig }
  }
})
</script>

<style scoped></style>
