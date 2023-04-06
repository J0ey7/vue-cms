<template>
  <page-search
    :SearchConfig="UserConfig"
    @resetBtnClick="handleResetBtn"
    @queryBtnClick="handleQueryBtn"
  ></page-search>
  <page-content
    :contentConfig="UserContentConfig"
    :pageName="'User'"
    @addSome="handleAddSome"
    @editSome="handleeditSome"
    ref="pageContentRef"
  ></page-content>
  <page-modal
    :ModalConfig="modalConfigRef"
    :defaultInfo="defaultInfo"
    ref="pageModalRef"
  ></page-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { PageSearch, pageContent, pageModal } from '@/shared/components'
import { UserConfig } from './config/search_config'
import { UserContentConfig } from './config/page_config'
import { ModalConfig } from './config/modal_config'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { useStore } from 'vuex'
import { computed } from '@vue/reactivity'

// 表格组件

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    pageContent,
    pageModal
  },
  setup() {
    // 使用组件ref 记得返回
    const { pageContentRef, handleResetBtn, handleQueryBtn } = usePageSearch()
    const editcb = () => {
      const password = ModalConfig.form.find((el) => el.field === 'password')
      password!.isHidden = true
    }
    const addCb = () => {
      const password = ModalConfig.form.find((el) => el.field === 'password')
      password!.isHidden = false
    }
    // 动态添加部门和角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = ModalConfig.form.find(
        (el) => el.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map(
        (item: any) => {
          return { title: item.name, value: item.id }
        }
      )
      const roleItem = ModalConfig.form.find((el) => el.field === 'roleId')
      roleItem!.options = store.state.entireRole.map((item: any) => {
        return { title: item.name, value: item.id }
      })
      return ModalConfig
    })

    const { handleAddSome, handleeditSome, pageModalRef, defaultInfo } =
      usePageModal(editcb, addCb)
    return {
      UserConfig,
      UserContentConfig,
      handleResetBtn,
      handleQueryBtn,
      pageContentRef,
      handleAddSome,
      pageModalRef,
      handleeditSome,
      defaultInfo,
      modalConfigRef
    }
  }
})
</script>

<style scoped type="less">
.user {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content {
  padding-top: 20px;
}
</style>
