<template>
  <el-form
    ref="ruleFormRef"
    :model="account"
    :rules="rules"
    label-width="60px"
    label-position="left"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="账号" prop="name">
      <el-input v-model="account.name" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" type="password" autocomplete="off" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from './config/account-config'
import localCache from '@/util/cache'
import type { FormInstance } from 'element-plus'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    // FormInstance表单实例类型，也可写为InstanceType<typeof ElForm>
    const cache = new localCache()
    const ruleFormRef = ref<FormInstance>()
    const account = reactive({
      password: cache.getCache('password') ?? '',
      name: cache.getCache('name') ?? ''
    })
    // 登录方法
    const login = (isKeepPass: boolean) => {
      ruleFormRef.value?.validate((valid) => {
        if (!valid) return
        if (valid) {
          //  1.判断要不要记住密码
          if (isKeepPass) {
            cache.setCache('name', account.name)
            cache.setCache('password', account.password)
          } else {
            cache.deleteCache('name')
            cache.deleteCache('password')
          }
          //  2.登录操作
          store.dispatch('login/accountLoginAction', account)
        }
      })
    }

    return { account, rules, login, ruleFormRef }
  }
})
</script>

<style scoped lang="less"></style>
