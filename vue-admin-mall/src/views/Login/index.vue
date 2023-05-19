<template>
  <a-form-model
    class="login-container"
    ref="loginForm"
    :model="loginForm"
    :rules="rules"
    v-bind="layout"
  >
    <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="loginForm.email" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="password">
      <a-input v-model="loginForm.password" type="password" autocomplete="off" />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('loginForm')"> 提交 </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('loginForm')"> 重置 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import loginUser from '@/api/user';

export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com$/; // 正则验证规则
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式不正确'));
    };
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码：'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [{ validator: validateEmail, trigger: 'change' }],
        password: [{ validator: validatePassword, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          loginUser(this.loginForm)
            .then((resp) => {
              // console.log(resp);
              this.$store.dispatch('setUserInfo', resp);
              this.$router.push({
                name: 'Home',
              });
            })
            .catch((err) => {
              this.$message.error(err);
            });
          return true;
        }
        this.$message.error('请输入账号和密码');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  max-width: 500px;
  margin: 100px auto;
  border: 1px solid #eee;
  padding: 30px 20px 6px;
}
</style>
