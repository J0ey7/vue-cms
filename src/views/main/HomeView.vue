<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '210px'"
        ><side-bar :collapse="isFold"></side-bar
      ></el-aside>
      <el-container class="page">
        <el-header class="page-header"
          ><heard-view @foldClick="callback"></heard-view
        ></el-header>
        <el-main class="page-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SideBar from './side-bar/side-bar.vue'
import HeardView from './hearder/heard-view.vue'
export default defineComponent({
  components: {
    SideBar,
    HeardView
  },
  setup() {
    let isFold = ref(false)
    const callback = (result: boolean) => {
      isFold.value = result
    }
    return { callback, isFold }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
