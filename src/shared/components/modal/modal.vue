<template>
  <div>
    <el-dialog title="新建用户" v-model="visible" center width="30%">
      <jh-form v-bind="ModalConfig" v-model="formData"></jh-form>
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="visible = false">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { JhForm } from '@/shared/components'
import { ref, defineProps } from 'vue'
let formData = ref({})
let visible = ref(false)
defineProps({
  ModalConfig: {
    type: Object,
    requied: true
  }
})
const handleAddSome = (payload: boolean) => {
  visible.value = payload
}
</script>

<style scoped></style>
