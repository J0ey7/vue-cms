<template>
  <div class="goods">
    <page-content
      :contentConfig="GoodsContentConfig"
      :pageName="'Goods'"
      ref="pageContentRef"
    >
      <template #img="scope">
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row['imgUrl']]"
        />
      </template>
      <template #oldPrice="scope">
        {{ '￥' + scope.row.oldPrice }}
      </template>
      <template #newPrice="scope">
        {{ '￥' + scope.row.newPrice }}
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PageSearch, pageContent } from '@/shared/components'
import { GoodsContentConfig } from './config/page_config'
export default defineComponent({
  components: {
    pageContent
  },
  name: 'goods',
  setup() {
    return { pageContent, GoodsContentConfig }
  }
})
</script>

<style scoped></style>
