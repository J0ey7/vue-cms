<template>
  <div class="page-search">
    <jh-form v-bind="SearchConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="foot">
          <el-button type="primary" @click="handleResetClick">重置</el-button>
          <el-button type="success" @click="searchClick">搜索</el-button>
        </div>
      </template>
    </jh-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { JhForm } from '@/shared/components'
export default defineComponent({
  emits: ['resetBtnClick', 'queryBtnClick'],
  props: {
    SearchConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    JhForm
  },
  setup(props, { emit }) {
    // 为了保证在不同的地方使用时候，双向绑定得数据不同
    const formOriginData: any = {}
    for (let item of props.SearchConfig.form) {
      formOriginData[item.field] = ''
    }

    let formData = ref(formOriginData)
    // 当用户点击重置
    const handleResetClick = () => {
      for (let key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      emit('resetBtnClick')
    }
    // 用户点击搜索
    const searchClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return { formData, handleResetClick, searchClick }
  }
})
</script>

<style scoped>
.header {
  color: #bfa;
}
.foot {
  padding: 10px 10px;
  justify-content: right;
  display: flex;
}
</style>
