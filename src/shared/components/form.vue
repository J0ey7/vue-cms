<template>
  <div class="jh-form">
    <slot name="header"></slot>
    <el-form
      :label-width="labelWidth"
      :model="formData"
      ref="formRef"
      :rules="rules"
    >
      <el-row align="center">
        <template v-for="item of form" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :prop="item.isValidator ? `${item.field}` : null"
              :label="item.label"
              :label-width="labelWidth"
              :style="itemStyle"
              :default-active="defaultId"
            >
              <template v-if="item.type === 'input'">
                <!-- 没有实现单向数据流 -->
                <el-input
                  :placeholder="item.placeholder"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'password'">
                <!-- <el-input type="password" v-model="formData[`${item.filed}`]" /> -->
                <el-input
                  type="password"
                  :placeholder="item.placeholder"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  style="width: 100%"
                  :placeholder="item.placeholder"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="subitem in item.options"
                    :key="subitem.value"
                    :label="subitem.title"
                    :value="subitem.value"
                  />
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="formData[`${item.field}`]"
                  v-bind="item.otherOptions"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { formEmits, FormInstance } from 'element-plus'
import { defineComponent, PropType, reactive, ref, watch } from 'vue'
import { IFormItem } from '../types'
export default defineComponent({
  emits: ['handleSubmit', 'update:modelValue'],
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    form: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    //配置响应式
    colLayout: {
      type: Object,
      default: () => {
        return {
          xl: 6, // >1920px 4个
          lg: 8,
          md: 12,
          sm: 24,
          xs: 24
        }
      }
    }
  },

  setup(props, { emit }) {
    const defaultId = ref('')
    const formData = ref({ ...props.modelValue })
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        immediate: true,
        deep: true
      }
    )
    // 导出表单实例
    const formRef = ref<FormInstance>()
    // 手机号的校验规则
    const checkCellphone = (rule: any, value: any, callback: any) => {
      const cellPhoneReg = new RegExp(
        /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      )
      if (!value) {
        return callback(new Error('请输入电话号码'))
      } else if (!cellPhoneReg.test(value)) {
        return callback(new Error('请输入正确格式的电话号码'))
      } else {
        return callback()
      }
    }
    const rules = reactive({
      cellphone: [{ validator: checkCellphone, trigger: 'blur' }]
    })
    // 提交表单操作
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!')
          emit('handleSubmit', false)
        } else {
          console.log('error submit!')
          emit('handleSubmit', true)
        }
      })
    }

    return { defaultId, formData, formRef, submitForm, checkCellphone, rules }
  }
})
</script>

<style scoped lang="less">
.jh-form {
  background-color: #fff;
  padding-top: 22px;
}
</style>
