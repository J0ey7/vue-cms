<template>
  <div class="role">
    <page-search
      :SearchConfig="RoleConfig"
      @resetBtnClick="handleResetBtn"
      @queryBtnClick="handleQueryBtn"
    ></page-search>
    <page-content
      :contentConfig="RoleContentConfig"
      :pageName="'Role'"
      @addSome="handleAddSome"
      @editSome="handleeditSome"
      ref="pageContentRef"
    ></page-content>
    <page-modal
      :ModalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      ref="pageModalRef"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        @check="checkChange"
        :props="{ shildren: 'children', label: 'name' }"
      />
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { usePageModal } from '@/hooks/use-page-modal'
import { usePageSearch } from '@/hooks/use-page-search'
import { PageSearch, pageContent, pageModal } from '@/shared/components'
import { getMenuLeafKeys } from '@/util/map-menus'
import { ElTree, Instance } from 'element-plus'
import { computed, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import { ModalConfig } from './config/modal_config'
import { RoleContentConfig } from './config/page_config'
import { RoleConfig } from './config/search_config'

const { pageContentRef, handleResetBtn, handleQueryBtn } = usePageSearch()
const store = useStore()
const modalConfigRef = computed(() => {
  return ModalConfig
})
const menus = computed(() => store.state.entireMenu)

const otherInfo = ref({})
const checkChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}
// 树形控件回显功能
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const editCallback = (item: any) => {
  const leafKeys = getMenuLeafKeys(item.menuList)
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafKeys, false)
  })
}

const { handleAddSome, handleeditSome, pageModalRef, defaultInfo } =
  usePageModal(editCallback, undefined)
</script>

<style scoped></style>
