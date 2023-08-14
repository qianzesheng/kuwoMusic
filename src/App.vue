<template>
  <div class="main">
      <!-- 路由视图 -->
      <keep-alive>
        <router-view v-if="$route.meta.keep" @getPlayerId="getPlayerId" @getPlayAllID="getPlayAllID" ></router-view>
      </keep-alive>

      <router-view v-if="!$route.meta.keep" @EnterSearchMusic="EnterSearchMusic" @searchBtn="searchBtn" :searchText="searchText" @getPlayerId="getPlayerId" @getPlayAllID="getPlayAllID" ></router-view>

      <!-- 播放器组件 -->
      <player-con v-show="playerId" :playerId="playerId" :playAllID="playAllID" @getPlayerId="getPlayerId"></player-con>
  </div>
</template>

<script>
import playerCon from "./components/base/playerCon.vue"
export default {
    data(){
        return {
            playerId:null,
            playAllID:null,
            MusicListTitle:null,//推荐歌单对应的id
            searchText:null,//搜索框的内容
        }
    },
    methods:{
        // 获取歌曲的id
        getPlayerId(id){
            this.playerId = id
        },
        getPlayAllID(id){
            this.playAllID = id
        },
        EnterSearchMusic(value){
            this.searchText = value
            console.log(this.searchText);
        },
        searchBtn(btnValue){
            this.searchText = btnValue
        }
    },
    components:{
        playerCon
    }
}
</script>

<style lang="scss">
.main {
    position: relative;
}
// 公共css
@import "./assets/css/base.css";
// 重置样式表
@import "./assets/css/reset.css"
</style>