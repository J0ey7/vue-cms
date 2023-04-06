<template>
  <div>
    <div class="mine-title">
      <div class="img-wrapper">
        <img src="~@/assets/img/logo.svg" />
      </div>
      <span v-if="!collapse">Vue3+Ts by LJH</span>
    </div>
    <el-menu
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      class="el-menu-vertical-demo"
      :collapse="collapse"
      :default-active="defaultValue"
    >
      <template v-for="item of userMenus" :key="item.id">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-if="item.type === 1">
            <template v-for="subItem of item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="menuClick(subItem)"
                >{{ subItem.name }}
              </el-menu-item>
            </template>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store/index'
import { Menu } from '@/store/type'
import { useRouter, useRoute } from 'vue-router'
import { selectMenuId } from '@/util/map-menus'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const userMenus = computed(() => store.state.login.userMenus)
    const menuClick = (item: Menu) => {
      router.push({
        path: item.url! ?? '/not-found'
      })
    }
    // 根据路径匹配对应菜单
    const path = route.path
    const menu = selectMenuId(userMenus.value!, path)
    const defaultValue = ref(menu.id + '')

    return { store, userMenus, menuClick, defaultValue }
  }
})
</script>

<style scoped lang="less">
.mine-title {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e1f4f6;
  .img-wrapper {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.menu-list {
  color: #e1f4f6;
}
.el-menu {
  border-right: none;
}
</style>
