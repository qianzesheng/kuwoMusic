import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
    // 默认首页
    {
      path: '/',
      redirect:"/home"
    },
    // 首页
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta:{
        keep:true
      }
    },
    // 推荐歌单内歌曲列表
    {
      path: '/songList',
      name: 'songList',
      component: ()=>import('../views/SongList.vue')
    },
    // 搜索框页面
    {
        path:'/search',
        name:'/search',
        component: ()=>import('../views/SearchMusic.vue')
    },
    // 歌单评论页面
    {
        path:'/comment/playlist',
        name:'/comment/playlist',
        component: ()=>import('../views/SongListsComment.vue')
    },
    // 登录页面
    {
        path:'/login',
        name:'/login',
        component: ()=>import('../views/LoginView.vue')
    },
    // 用户中心页面
    {
        path:'/user',
        name:'/user',
        component: ()=>import('../views/UserView.vue'),
        beforeEnter: (to, from, next) => {
            let token = window.localStorage.getItem("token");
            if(!token){
                next('/login');
                return;
            }else{
                next();
            }
        }
    },
    // 搜索框关键词之后的页面
    {
        path:'/searchAll',
        name:'/searchAll',
        component: ()=>import('../views/searchAllMusic')
    },
    // 排行榜
    {
        path:'/songlistsPVP',
        name:'/songlistsPVP',
        component: ()=>import('../views/SongListsPvp')
    },
  ]

const router = new VueRouter({
//   mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局路由守卫
// 必须登录成功后才可以进入首页
// router.beforeEach((to,from,next)=>{
//     let token = window.localStorage.getItem("token");
//     // 登录页面判断
//     if(to.path=='/login'){
//         next();
//         return;
//     }else{//判断是否登录
//         if(!token){
//             next('/login')//登录界面
//             return;
//         }else{
//             next()//执行下一个路由
//         }
//     }
// })

export default router
