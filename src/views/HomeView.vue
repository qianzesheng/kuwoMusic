<template>
  <div>
    <div class="box">
        <!-- 顶部搜索 -->
        <div class="topSearch">
            <router-link tag="div" to="/user" class="left">
                <i class="iconfont icon-user"></i>
            </router-link>
            <router-link tag="div" to="/search" class="center">
                <div>
                    <i class="iconfont icon-search"></i>
                    <span>告五人</span>
                </div>
            </router-link>
            <div class="right">
                <i class="iconfont icon-yuyin"></i>
            </div>
        </div>

        <!-- 轮播图 -->
        <div class="banner">
            <van-swipe @change="onChange" class="my-swipe" :autoplay='2000' indicator-color="white">
                <van-swipe-item v-for="(item,index) in imgLists" :key="index">
                    <div class="banner-pict">
                        <img :src="item.pic" alt="">
                    </div>
                </van-swipe-item>
                <template #indicator>
                    <div class="custom-indicator indicator">
                        <ul>
                            <li v-for="num in imgLists.length" :key="num" :class="{'con':indexSwiper==(num-1)}" ></li>
                        </ul>
                    </div>
                </template>
            </van-swipe>
        </div>

        <!-- 可滑动的导航 -->
        <div class="nav">
            <div class="swiper mySwiper mySwiper-abc">
                <div class="swiper-wrapper ul">
                    <div @click="jumpPVP(item.id)" v-for="item in Homepageball" :key="item.id" class="swiper-slide li">
                        <div class="round">
                            <img :src="item.iconUrl" alt="">
                            <!-- <div class="num">0</div> -->
                        </div>
                        <p>{{item.name}}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 推荐歌单 -->
        <div v-if="PLAYLIST_blocks" class="songList">
            <div class="title">
                <h3>{{PLAYLIST_blocks.uiElement.subTitle.title}}</h3>
                <div class="more">
                    更多<span class="iconfont icon-arrow-right-bold"></span>
                </div>
            </div>
            <div class="lists">
                <van-swipe class="my-swipe" :loop="false" :show-indicators="false" :width="117">
                    <van-swipe-item  v-for="(item) in PLAYLIST_blocks.creatives" :key="item.creativeId">
                        <router-link tag="div" :to="'/songList?id='+item.creativeId" class="items">
                            <div class="pic">
                                <img class="auto-img" :src="item.uiElement.image.imageUrl+'?param=110y110'" alt="">
                                <div class="player">
                                    <div class="num">
                                        <svg t="1683820209997" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2384" width="200" height="200"><path d="M224 938.713333a53.58 53.58 0 0 1-53.333333-53.433333V138.72a53.333333 53.333333 0 0 1 80.886666-45.666667l618.666667 373.28a53.333333 53.333333 0 0 1 0 91.333334l-618.666667 373.28a53.16 53.16 0 0 1-27.553333 7.766666z m0.046667-810.666666a10.98 10.98 0 0 0-5.333334 1.42 10.466667 10.466667 0 0 0-5.38 9.253333v746.56a10.666667 10.666667 0 0 0 16.18 9.133333l618.666667-373.28a10.666667 10.666667 0 0 0 0-18.266666l-618.666667-373.28a10.386667 10.386667 0 0 0-5.446666-1.586667z" fill="#ffffff" p-id="2385"></path></svg>
                                        {{item.resources[0].resourceExtInfo.playCount | playcountData}}
                                    </div>
                                </div>
                            </div>
                            <p class="txt-cut">{{item.uiElement.mainTitle.title}}</p>
                        </router-link>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>

        <!-- 三行歌曲轮播 -->
        <div v-if="STYLE_blocks" class="selectedSong"  >
            <div class="title">
                <h3>
                    <span class="iconfont icon-liebiaobofang"></span>{{STYLE_blocks.uiElement.subTitle.title}}
                </h3>
                <div class="more">
                    <span class="iconfont icon-bofang"></span>播放
                </div>
            </div>
            <div class="lists">
            <!-- Swiper -->
                <div class="swiper-container swiper-selectedSong">
                    <van-swipe class="my-swipe" :show-indicators=false>
                        <van-swipe-item v-for="(item,index) in STYLE_blocks.creatives" :key="index">
                            <div class="swiper-slide item" >
                                <ul>
                                    <li v-for="data in item.resources" :key="data.resourceId" >
                                        <div class="img">
                                            <img :src="data.uiElement.image.imageUrl+'?param=40y40'" alt="">
                                        </div>
                                        <div class="right">
                                        <h4 ><span class="one-txt-cut">{{data.resourceExtInfo.song.al.name}}</span><span>-{{data.resourceExtInfo.artists[0].name}}</span></h4>
                                        <i class="iconfont icon-bofang1"></i>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </van-swipe-item>
                    </van-swipe>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { getBanner,getHomepageball,getHomepageBlock } from "../api/home"
import Swiper from "swiper"
export default {
    data() {
        return {
            // 轮播图数据
            imgLists:[
                require("../assets/images/pic.jpg"),
                require("../assets/images/pic.jpg"),
                require("../assets/images/pic.jpg"),
            ],
            indexSwiper:0,
            // 推荐歌单数据
            songList:[
                {
                    id:1,
                    name:"推荐歌单",
                    picUrl:"../assets/images/pic.jpg",
                },
                {
                    id:2,
                    name:"推荐歌单",
                    picUrl:"../assets/images/pic.jpg",
                },
                {
                    id:3,
                    name:"推荐歌单",
                    picUrl:"../assets/images/pic.jpg",
                },
            ],
            // 首页导航图标及小标题
            Homepageball:[],
            PLAYLIST_blocks:null,
            STYLE_blocks:null,
        }
    },
    methods:{
        onChange(index){
            this.indexSwiper = index
        },
        getBannerFun(){
            // 获取轮播图数据
            getBanner().then(data=>{
                this.imgLists = data.banners; 
            }),
            // 获取首页导航图标及小标题
            getHomepageball().then(data=>{
                console.log(data);
                this.Homepageball = data.data
            }),
            // 获取首页推荐歌单
            getHomepageBlock().then(data=>{
                let blocks = data.data.blocks
                console.log(data);
                // console.log(blocks);
                let PLAYLIST_Index = blocks.findIndex(item=>item.blockCode == "HOMEPAGE_BLOCK_PLAYLIST_RCMD");//推荐歌单
                if(PLAYLIST_Index != -1){
                    this.PLAYLIST_blocks = blocks[PLAYLIST_Index];
                }

                let STYLE_Index = blocks.findIndex(item=>item.blockCode == "HOMEPAGE_BLOCK_STYLE_RCMD");//三行滑动的歌单列表
                if(STYLE_Index !=-1){
                    this.STYLE_blocks = blocks[STYLE_Index]
                }
                // console.log(this.STYLE_blocks);
            })
        },
        jumpPVP(id){
            if(id==-3){
                this.$router.push("/songlistsPVP")
            }
        }
    },
    // 生命周期获取函数
    created(){
        this.getBannerFun()
    },
    mounted(){
     new Swiper(".mySwiper-abc", {
        slidesPerView: 5.7,
        paginationClickable:true,
        spaceBetween: 30,
        freeMode: true,
        observer:true,
        observerParents:true,
      });
    },
    // 过滤器,将播放量以万显示
    filters:{
        playcountData(value){
            if(value<10000){
                return value
            }
            let w = value>10000?value/10000:value;
            let y = w>10000? parseInt(w/10000)+"亿":parseInt(w)+"万"
            return y
        }
    }
}
</script>

<style>

.box {
    background: #f5f5f5;
}

.selectedSong{
    margin-top: 8px;
    background-color: #fff;
    padding: 12px 0px 12px 12px;
    border-radius: 7px;
}
.selectedSong .title{
    display: flex;
    justify-content: space-between;
}

.selectedSong .title h3 {
    height: 31px;
    line-height: 31px;
    /* padding-left: 20px; */
    /* background: url("../assets/images/pic.jpg") no-repeat left center; */
    /* background-size: 18px; */
    font-size: 17px;
    font-weight: 700;
}

.selectedSong .title h3 span {
    margin-right: 4px;
}

.selectedSong .title .more {
    height: 20px;
    line-height:21px;
    width: 42px;
    border:1px solid #F7F7F7;
    border-radius: 10px;
    font-size: 10px;
    text-align: center;
    margin-right: 12px;
    margin-top: 5px;
}

.selectedSong .title .more .iconfont {
    font-size: 10px;
    margin-right: 2px;
}

.selectedSong .lists .item {
    width: 93%;
}

.selectedSong .lists .item ul li {
    display: flex;
}

.selectedSong .lists .item ul li .img {
    width: 40px;
    height: 40px;
    margin: 2px 7px 2px 0px;
    border-radius: 6px;
    overflow: hidden;
}

.selectedSong .lists .item ul li .img img {
    width: 40px;
    height: 40px;
}

.selectedSong .lists .item ul li .right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #f7f7f7;
}

.selectedSong .lists .item ul li .right h4 {
    display: flex;
    align-items: center;
    font-size: 12px;
    height: 45px;
    line-height: 45px;
    color: #323232;
}

.selectedSong .lists .item ul li .right .iconfont {
    font-size: 25px;
    line-height: 45px;
    color: #171717;
}

.selectedSong .lists .item ul li .right h4 span {
    display: inline-block;
    font-size: 12px;
    color: #949494;
}

.selectedSong .lists .item ul li .right h4 span:first-child {
    max-width: 160px;
    font-weight: 700;
    color: #222;
}

.selectedSong .lists .item ul li:last-of-type .right{
    border: none;
}

.indicator {
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
}

.songList {
    background: #fff;
    width: 100%;
    padding-left: 12px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.songList .lists {
    width: 100%;
    height: 150px;
    display: flex;
    flex-wrap: nowrap;
}

.songList .lists .items {
    width: 110px;
    height: 150px; 
    box-shadow: 0px -10px 4px -7px #F2F2F2;
}

.songList .lists .items p{
    text-align: left;
        font-size: 12px;
        color:#575757;
        line-height: 14px;
        margin-top: 4px;
}

.songList .lists .items .pic {
    position: relative;
    width: 110px;
    height: 110px;
    border-radius: 10px;
    overflow: hidden;
}

.songList .lists .items .pic .player{
    position: absolute;
    top: 2px;
    right: 2px;
    height: 14px;
    line-height: 14px;
    border-radius: 7px;
    padding: 0 6px;
    background: #c7c7c7;
    color: #fff;
    font-size: 10px;
}

.lists .items .pic .player svg {
    position: relative;
    font-size: 10px;
    top: -1px;
}

.lists .items .pic .player .num {
    transform: scale(0.9);
}



.songList .title {
    height: 43px;
    display: flex;
    justify-content: space-between;
}

.songList .title h3 {
    height: 43px;
    line-height: 43px;
    font-weight: 700;
    color: #171717;
}

.songList .title .more {
    height: 19px;
    line-height: 19px;
    border: 1px solid #f7f7f7;
    border-radius: 10px;
    font-size: 12px;
    color: #2c2c2c;
    margin-top: 10px;
    padding: 0 7px;
}

.songList .title .more i {
    font-size: 10px
};

.custom-indicator {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 5px;
    text-align: center;
}

.custom-indicator ul {
    display: inline-block;
    margin: 0 auto;
}

.custom-indicator ul li {
    display: inline-block;
    width: 6px;
    height: 2px;
    margin: 0 2px;
    background-color: rgba(255,255,255,0.6);
}

.custom-indicator ul li.con {
    background-color: #fff;
}

.my-swipe {
    overflow: hidden;
    border-radius: 15px;
}

.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
}

.banner {
    width: 100%;
    /* height: 136px; */
    padding: 0 12px;
    background-image: linear-gradient(#eef2f2 ,#fff);
}

.banner .banner-pict {
    border-radius: 15px;
    width: 100%;
}

.banner .banner-pict img {
    border-radius: 15px;
    width: 100%;
}

.topSearch {
    width: 100%;
    height: 52px;
    background: #eef2f2;
    padding: 0 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.topSearch i {
    font-size: 24px;
}

.topSearch .left {
    margin-right: 12px;

}

.topSearch .center {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 78.9%;
    height: 28px;
    margin-right: 12px;
    background: #fff;
    border-radius: 15px;
    font-size: 14px;
}

.topSearch .center i{
    font-size: 14px;
}

.nav {
    overflow: hidden;
    display: flex;
    align-items: center;
    width: 100%;
    height: 76px;
    padding-left: 12px;
    border-bottom: 2px solid #f5f5f5;
    background: #fff;
    /* background: pink;  */
}

.nav .ul {
    display: flex;
    flex-wrap: nowrap;
}

.nav .ul .li {
    width: 40px !important;
    margin-right: 29px !important;
    text-align: center;
    display: inline-block;
}

.nav .ul .li .round {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff1f1;
    line-height: 40px;
    text-align: center;
    text-indent: -70px;
    overflow: hidden;
}

.nav .ul .li .round img {
    width: 100%;
    display: inline-block;
    filter: drop-shadow(35px 0px 0px red);
}

.nav .ul .li p {
    width: 48px;
    margin-top: 4px;
    font-size: 12px;
    transform: scale(0.8) translateX(-4px);
}

.mySwiper-abc {
    width: 375px;
}



</style>