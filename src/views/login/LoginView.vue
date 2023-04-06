<template>
  <div class="login">
    <login-item></login-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginItem from './LoginItem.vue'
export default defineComponent({
  components: {
    'login-item': LoginItem
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.login {
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/login-bg.svg');
  align-items: center;
  justify-content: center;
}
</style>
