<template>
  <div class="HomePage-container">
    <div class="HomePageLeft">
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :unique-opened="uniqueOpened"
        :router = "router"
      >
        <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.authName}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="submenu.path + ''" v-for="submenu in item.children" :key="submenu.id">
              {{submenu.authName}}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="HomePageRight">
      <div class="HomePageRightTop">
         <div class="title-left" @click="menuOpenOrClose">
           <i class="el-icon-s-fold"></i>
         </div>
         <div class="title-text">我是标题</div>
         <div class="title-operation" @click="exit">退出</div>
       </div>
       <!-- 嵌套路由显示区域 -->
       <div class="right-box-content">
         <router-view></router-view>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: [],
      isCollapse: false,
      uniqueOpened: true,
      router: true
    }
  },
  created () {
    this.loadMenus()
  },
  methods: {
    exit () {
      localStorage.removeItem('userinfo')
      this.$router.push('/')
      // this.$msg({
      //   message: '退出成功',
      //   type: 'success'
      // })
    },
    async loadMenus () {
      var { data } = await this.$http.get('menus')
      // console.log(data)
      this.menuList = data.data
    },
    menuOpenOrClose () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
  }
  .el-footer{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100vh;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-button{
      width: 100px;
      height: 40px;
  }
  .HomePage-container{
    display: flex;
  }
  .el-menu-vertical-demo{
    height: 100vh;
  }
  .HomePageRight{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .HomePageRightTop{
    background-color: rgb(185, 175, 175);
      height: 80px;
      text-align: center;
      line-height: 80px;
      width: 100%;
      display: flex;
  }
  .title-left {
    width: 100px;
    font-size: 30px;
  }
  .title-text {
    flex-grow: 1;
  }
  .title-operation {
    width: 100px;
  }
  .right-box-content {
    flex-grow: 1;
  }
</style>
