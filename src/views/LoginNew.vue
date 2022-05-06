<template>
  <div class="bg">
    <div class="login-box">
      <div class="login-box-title">后台管理系统</div>
      <!-- 表单区域 -->
      <el-form :model='ruleForm' :rules='rules' ref='ruleForm'>
        <!-- 账号输入框 -->
        <el-form-item prop='username'>
          <el-input placeholder="请输入账号" :clearable="clearable" v-model="ruleForm.username">
            <span slot="prefix" class="el-icon-user"></span>
          </el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop='password'>
          <el-input placeholder="请输入密码" :clearable="clearable" v-model="ruleForm.password">
            <span slot="prefix" class="el-icon-lock"></span>
          </el-input>
        </el-form-item>
        <!-- 表单按钮 -->
        <el-form-item>
          <el-button type="primary" class="login-form-btn" @click='login("ruleForm")'>立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      clearable: true,
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // login (formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       // axios发送post请求
    //       this.$http.post('login', this.ruleForm).then((reslove, rejced) => {
    //         console.log(reslove)
    //         if (reslove.data.meta.status === 200) {
    //           this.$msg({
    //             message: '登陆成功',
    //             type: 'success'
    //           })
    //           localStorage.setItem('userinfo', JSON.stringify(reslove.data.data))
    //           this.$router.push('/home')
    //         } else {
    //           this.$msg.error('账号或密码错误，登录失败')
    //         }
    //       })
    //     } else {
    //       return false
    //     }
    //   })
    // }
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginAjax()
        }
      })
    },
    async loginAjax () {
      // 发送ajax调用登录接口
      // axios#post(url[, data[, config]])
      var { data } = await this.$http.post('login', this.ruleForm)
      console.log('登录结果：', data)

      if (data.meta.status === 200) {
        this.$msg({
          message: '登录成功!',
          type: 'success'
        })
        // 登录成功，服务器还返回了我们的个人信息以及token信息
        // 个人信息是需要展示到登录成功的首页的
        // token是登录成功后请求其他接口需要使用的
        // 把服务器返回的数据持久化到浏览器中
        localStorage.setItem('userinfo', JSON.stringify(data.data))
        // 跳转到首页  /main
        this.$router.push('/home')
      } else {
        this.$msg.error('账号或密码错误')
      }
    }
  }
}
</script>

<style>
/* 背景 */
.bg {
  background-color: black;
  width: 100%;
  height: 100%;
  position: relative;
}

/* 表单盒子 */
.login-box {
  width: 400px;
  height: 360px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 30px;
}

/* 表单标题 */
.login-box-title {
  line-height: 100px;
  font-weight: bold;
}

/* 表单按钮 */
.login-form-btn {
  width: 400px;
}
</style>
