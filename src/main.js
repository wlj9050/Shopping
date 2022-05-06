import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
// 导入element元素
import { Form, Button, Input, FormItem, Message, Container, Aside, Header, Main, Footer, Tree, Menu, Submenu, MenuItem, MenuItemGroup, RadioGroup, RadioButton, Table, TableColumn, Switch } from 'element-ui'
import '../src/css/index.css'
import axios from 'axios'

// Vue.config.productionTip = false
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/'
})
instance.interceptors.request.use((config) => {
  console.log('我监听到网络请求了', config)
  // 从localStorage中获取userInfo，访问token属性
  var userinfo = JSON.parse(localStorage.getItem('userinfo'))
  // 一定要判断这个是否为空
  if (userinfo) {
    config.headers.Authorization = userinfo.token
  }
  return config
})
Vue.prototype.$http = instance
Vue.use(Form)
Vue.use(Button)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Tree)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)

Vue.prototype.$msg = Message

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
