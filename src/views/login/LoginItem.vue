<template>
  <div>
    <h3 style="text-align: center; margin-bottom: 10px">后台管理系统</h3>
    <div>
      <el-tabs type="border-card" class="demo-tabs" v-model="currentTab">
        <el-tab-pane name="account">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Stamp /></el-icon>
              <span>账号登录</span>
            </span>
          </template>
          <div class="wrapper">
            <login-account ref="accountRef"></login-account>
          </div>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Phone /></el-icon>
              <span>手机登录</span>
            </span>
          </template>
          <div class="wrapper">
            <login-phone ref="phoneRef"></login-phone>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="display: flex; justify-content: space-between">
      <el-checkbox label="记住密码" size="large" v-model="isKeepPass" />
      <div style="padding-top: 8px">
        <a href="" style="font-size: 14px; color: #409eff">忘记密码</a>
      </div>
    </div>
    <el-button type="primary" style="width: 100%" @click="login()"
      >登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { Calendar } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { defineComponent } from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'
export default defineComponent({
  components: {
    'login-account': LoginAccount,
    'login-phone': LoginPhone
  },
  setup() {
    // InstanceType<typeof LoginAccount> 组件实例类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    // 是否记住密码
    const isKeepPass = ref(true)
    // 切换登录模式
    const currentTab = ref<string>('account')
    const login = () => {
      currentTab.value === 'phone'
        ? phoneRef.value?.login(isKeepPass.value)
        : accountRef.value?.login(isKeepPass.value)
    }

    return {
      login,
      Calendar,
      accountRef,
      isKeepPass,
      currentTab,
      phoneRef
    }
  }
})
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 450px;
  height: 150px;

  .wrapper-input {
    display: flex;
    height: 32px;
    .text {
      width: 70px;
      line-height: 30px;
      margin-right: 10px;
    }
    .text:before {
      content: '* ';
      color: red;
    }
  }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
