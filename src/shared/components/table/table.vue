<template>
  <div style="background-color: #fff; margin-top: 10px">
    <div class="header">
      <div class="title">{{ title }}</div>
      <div><slot name="header"></slot></div>
    </div>
    <el-table
      :data="dataList"
      style="width: 100%"
      v-bind="childrenProps"
      @selection-change="selectChange"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
        v-if="isShowSelection"
      />
      <el-table-column
        type="index"
        width="80"
        align="center"
        label="序号"
        v-if="idShowIndex"
      ></el-table-column>
      <!-- 列中的插槽 -->
      <template v-for="propItem in propList" :key="propItem">
        <el-table-column show-overflow-tooltip v-bind="propItem" align="center">
          <template #default="scoped">
            <slot :name="propItem.slotName" :row="scoped.row">{{
              scoped.row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot>
        <el-pagination
          v-model:currentPage="pageInfo.currentPage"
          v-model:page-size="pageInfo.pageSize"
          @current-change="currentChange"
          @size-change="sizeChange"
          :page-sizes="[10, 11, 12, 13]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
      /></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  emits: ['selectionChange', 'update:page'],
  props: {
    propList: {
      type: Object,
      requied: true
    },
    idShowIndex: {
      type: Boolean,
      default: true
    },
    isShowSelection: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      dafault: ''
    },
    dataList: {
      type: Object,
      requied: true
    },
    dataCount: {
      type: String,
      required: true
    },
    page: {
      type: Object,
      required: true
    },
    childrenProps: {
      type: Object,
      dafauly: () => ({})
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const pageInfo = reactive(props.page)

    const small = ref(false)
    const background = ref(false)
    const disabled = ref(false)
    console.log(props.isShowSelection)

    const currentChange = (currentPage: number) => {
      emit('update:page', { ...pageInfo })
    }
    const sizeChange = (currrentSize: number) => {
      emit('update:page', { ...pageInfo })
    }

    const selectChange = (value: any) => {
      emit('selectionChange', value)
    }

    return {
      selectChange,
      small,
      background,
      disabled,
      currentChange,
      pageInfo,
      sizeChange
    }
  }
})
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
}
.footer {
  display: flex;
  justify-content: right;
}
</style>
