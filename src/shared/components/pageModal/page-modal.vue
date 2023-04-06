<template>
  <div>
    <el-dialog
      title="新建用户"
      v-model="visible"
      center
      width="30%"
      destroy-on-close="true"
    >
      <jh-form
        v-bind="ModalConfig"
        v-model="formData"
        @handleSubmit="handleSubmit"
        ref="jhFormRef"
      ></jh-form>
      <slot></slot>
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="comfirmClick()">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { JhForm } from '@/shared/components'
import { ref, defineProps, defineExpose, reactive, watch, toRefs } from 'vue'
import { useStore } from 'vuex'

let visible = ref(false)
const store = useStore()

const props = defineProps({
  ModalConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  }
})
// props里面的监听要写成函数形式
let formData = ref<any>({})
watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.ModalConfig.form) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)

const jhFormRef = ref<InstanceType<typeof JhForm>>()
// 点击确认按钮
const comfirmClick = () => {
  jhFormRef.value?.submitForm(jhFormRef.value?.formRef)
}
// 提交表单后的操作
const handleSubmit = (params: boolean) => {
  visible.value = params
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    store.dispatch('system/editPageItemAction', {
      pageName: props.ModalConfig.pageName,
      params: { ...formData.value, ...props.otherInfo },
      type: props.ModalConfig.type,
      id: props.defaultInfo.id
    })
  } else {
    // 新建
    store.dispatch('system/createPageItemAction', {
      pageName: props.ModalConfig.pageName,
      params: { ...formData.value, ...props.otherInfo },
      type: props.ModalConfig.type
    })
  }
}
defineExpose({
  visible,
  jhFormRef
})
</script>

<style scoped></style>
