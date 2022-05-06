<template>
  <div class="user-list-container">
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="手机号"> </el-table-column>
      <el-table-column prop="username" label="账号"> </el-table-column>
      <el-table-column prop="role_name" label="角色名称"> </el-table-column>
      <!-- 这里要显示的是一个布尔值，但是它不展示，我们需要使用switch组件来填充这个内容，但是switch又需要一个布尔值作为参数 -->
      <el-table-column prop="mg_state" label="账号状态">
        <!-- 作用域插槽 -->
        <template slot-scope="aaa">
          <el-switch
            v-model="aaa.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userList: [],
      params: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  created () {
    this.loadUserList()
  },
  methods: {
    async loadUserList () {
      var { data } = await this.$http.get('users', {
        params: this.params
      })
      this.userList = data.data.users
    }
  }
}
</script>

<style>
</style>
