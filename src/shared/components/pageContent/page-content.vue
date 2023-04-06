<template>
  <JhTable
    v-bind="contentConfig"
    :dataList="dataList"
    :dataCount="dataCount"
    v-model:page="pageInfo"
    @selectionChange="selectionChange"
  >
    <!-- 共有的插槽 -->
    <template #status="scope"
      ><el-button>{{
        scope.row['enable'] ? '启用' : '禁用'
      }}</el-button></template
    >
    <template #createAt="scope"
      ><strong>{{
        getCurrentInstance()?.appContext.config.globalProperties.$filters.formatTime(
          scope.row['createAt']
        )
      }}</strong></template
    >
    <template #updateAt="scope"
      ><strong>{{
        getCurrentInstance()?.appContext.config.globalProperties.$filters.formatTime(
          scope.row['updateAt']
        )
      }}</strong></template
    >
    <template #handler="scope">
      <el-button type="text" v-if="isUpdate" @click="editClick(scope.row)"
        >编辑</el-button
      >
      <el-button type="text" v-if="isDelete" @click="deletehandle(scope.row)">
        删除</el-button
      >
    </template>
    <!-- 特有的插槽，例如图片等 -->
    <template
      v-for="propItem of specialSlot"
      :key="propItem.id"
      #[propItem.slotName]="scope"
    >
      <slot :name="propItem.slotName" :row="scope.row"></slot
    ></template>

    <template #header>
      <el-button type="primary" v-if="isCreate" @click="handlePlus"
        >新建用户</el-button
      >
    </template>
  </JhTable>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { useStore } from '@/store/index'
import { JhTable, pageModal } from '@/shared/components'
import { getCurrentInstance } from 'vue'
import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
  components: {
    JhTable
  },
  props: {
    contentConfig: {
      type: Object,
      requied: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['addSome', 'editSome'],
  setup(props, { emit }) {
    const selectionChange = (value: any) => {
      console.log(123)
    }
    const store = useStore()

    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.contentConfig?.type)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.contentConfig?.type)
    )
    // 分页器
    const pageInfo = reactive({
      currentPage: 1,
      pageSize: 10
    })
    watch(pageInfo, (newValue: any) => getList())
    // 获取特有的插槽
    const specialSlot = props.contentConfig?.propList.filter((item: any) => {
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false
      else return true
    })

    const getList = (params: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        params: {
          offset: (pageInfo.currentPage - 1) * pageInfo.pageSize,
          size: pageInfo.pageSize,
          ...params
        }
      })
    }
    // 新增操作
    const handlePlus = () => {
      emit('addSome', true)
    }
    const editClick = (params: any) => {
      emit('editSome', params)
    }
    // 编辑操作
    getList()
    // 删除操作
    const deletehandle = (params: any) => {
      store.dispatch('system/deletePageItemAction', {
        pageName: props.contentConfig?.type,
        id: params.id
      })
    }

    // 权限控制
    const isCreate = usePermission(props.contentConfig?.pageName, 'create')
    const isUpdate = usePermission(props.contentConfig?.pageName, 'update')
    const isDelete = usePermission(props.contentConfig?.pageName, 'delete')
    const isQuery = usePermission(props.contentConfig?.pageName, 'query')

    return {
      selectionChange,
      getCurrentInstance,
      dataList,
      getList,
      dataCount,
      pageInfo,
      specialSlot,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      deletehandle,
      handlePlus,
      editClick
    }
  }
})
</script>

<style scoped></style>
