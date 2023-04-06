<template>
  <el-form
    ref="ruleFormRef"
    :model="phone"
    :rules="rules"
    label-width="70px"
    label-position="left"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="手机号" prop="phoneNum">
      <el-input v-model="phone.phoneNum" type="text" autocomplete="off" />
    </el-form-item>
    <div style="display: flex">
      <el-form-item label="验证码" prop="exactly">
        <el-input v-model="phone.exactly" type="password" autocomplete="off" />
      </el-form-item>
      <el-button type="primary" style="margin-left: 10px">获取验证码</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import localCache from '@/util/cache'
import { FormInstance } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from './config/account-config'

export default defineComponent({
  setup() {
    const store = useStore()
    const cache = new localCache()
    const phone = reactive({
      phoneNum: '',
      exactly: ''
    })
    const ruleFormRef = ref<FormInstance>()
    const login = (isKeepPass: boolean) => {
      ruleFormRef.value?.validate((valid) => {
        if (!valid) return
        if (valid) {
          //  1.判断要不要记住密码
          if (isKeepPass) {
            cache.setCache('name', phone.phoneNum)
            cache.setCache('pass', phone.exactly)
          } else {
            cache.deleteCache('name')
            cache.deleteCache('pass')
          }
          //  2.登录操作
          store.dispatch('login/phoneLoginAction')
        }
      })
    }
    return { phone, rules, login, ruleFormRef }
  }
})
</script>

<style scoped lang="less"></style>
