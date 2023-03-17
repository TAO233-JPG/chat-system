<template>
  <div class="login-pane">
    <h2>{{ title }}</h2>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      class="demo-ruleForm"
      label-position="top"
    >
      <el-form-item label="username" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button class="submit-btn" type="primary" @click="submitForm(ruleFormRef)"
          >Submit</el-button
        >
      </el-form-item>
    </el-form>
    <footer v-show="isLogin">
      没有账号?<span @click="swicthMethod" class="switch-btn">注册一个</span>
    </footer>
    <footer v-show="!isLogin">
      已有账号?<span @click="swicthMethod" class="switch-btn">登录一个</span>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import api from '@/server/index'
import useUserStore from '@/stores/user/user'
const userStore = useUserStore()
const router = useRouter()
enum Methods {
  Login = 'Login',
  SignUp = 'Sign Up'
}
const title = ref<Methods>(Methods.Login)

const isLogin = computed(() => {
  return title.value === Methods.Login
})

const swicthMethod = () => {
  title.value = isLogin.value ? Methods.SignUp : Methods.Login
  ruleFormRef.value?.resetFields()
}

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  password: '',
  name: ''
})

const rules = reactive<FormRules>({
  password: [{ required: true, trigger: 'blur' }],
  username: [{ required: true, trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })

  if (isLogin.value) {
    await userStore.login(ruleForm)
    router.replace('/chatRoom')
  } else {
    await api.postByJson('/user/signup', ruleForm)
  }
}
</script>

<style lang="scss" scoped>
.login-pane {
  position: absolute;
  left: 50%;
  top: 50%;

  width: 380px;
  padding: 0px 40px;
  padding-bottom: 50px;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 1px #b7b7b7;

  h2 {
    text-align: center;
    padding: 20px 0;
    font-size: 28px;
    font-weight: 800;
  }

  .submit-btn {
    width: 100%;
    margin-top: 15px;
  }

  footer {
    font-size: 12px;
    text-align: center;

    .switch-btn {
      color: #409eff;
      text-decoration: underline;
      cursor: pointer;
      padding: 0 8px;
    }
  }
}
</style>
