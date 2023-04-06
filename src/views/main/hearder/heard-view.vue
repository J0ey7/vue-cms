<template>
  <div class="wrapper">
    <div class="nav-icon">
      <template v-if="isFold"
        ><el-icon size="30px" @click="foldClick"><Fold /></el-icon
      ></template>
      <template v-else
        ><el-icon size="30px" @click="foldClick"><Expand /></el-icon
      ></template>
    </div>
    <el-breadcrumb separator="/">
      <template v-for="item of breadcrumbs" :key="item.name"
        ><el-breadcrumb-item> {{ item.name }}</el-breadcrumb-item></template
      >
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { selectMenuId } from '@/util/map-menus'

export default defineComponent({
  setup(props, { emit }) {
    let isFold = ref(false)
    const foldClick = () => {
      isFold.value = !isFold.value
      emit('foldClick', isFold.value)
    }
    // 面包屑数据数组
    const breadcrumbs = computed(() => {
      const store = useStore()
      const route = useRoute()
      const userMenus = computed(() => store.state.login.userMenus)
      const path = route.path
      return selectMenuId(userMenus.value!, path, [])
    })

    return { isFold, foldClick, breadcrumbs }
  }
})
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  align-items: center;
  .nav-icon {
    margin-right: 20px;
  }
}
</style>
