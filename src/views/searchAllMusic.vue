<template>
    <div>
        <div class="searchAll">
            <div class="searchAll-top">
                <div class="top-left">
                    <router-link tag="i" to="/search" class="iconfont icon-arrow-left-bold"></router-link>
                </div >
                <div class="searchAll-top-center">
                    <i class="iconfont icon-search"></i>
                    <input @click="BackSearch" type="text" :value="searchText" placeholder="请输入你想搜索的歌曲">
                </div>
                <div class="searchAll-top-right">搜索</div>
            </div>
            <div class="searchAll-top-nav">
                <div @click="navActive(index)" v-for="(item,index) in searchAllNav" :key="index" :class="['top-nav-list',{'active':index==active}]">{{item}}</div>
            </div>
            <!-- 单曲列表的感兴趣部分 -->
            <transition>
                <div v-show="active==0" class="searchAll-top-interest">
                    <div class="top-interest-content">
                        <div class="interest-title">你可能感兴趣的</div>
                        <!-- 歌手详情 -->
                        <div v-for="item in searchInterestSinger" :key="item.id" class="interest-singer">
                            <div class="singer-pict">
                                <img class="auto-img" :src="item.img1v1Url+'?param=53y53'" alt="">
                            </div>
                            <div class="singer-info">
                                <div class="one-txt-cut singer-info-name">
                                    歌手: 
                                    <span>{{item.name}}</span>
                                    <span class="highName">({{item.alias[0]}})</span>
                                </div>
                                <div class="fans-music">
                                    <span style="margin-right:6px">粉丝: {{item.fansSize|playcountData}}</span>
                                    <span>歌曲: {{item.musicSize}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 歌手的专辑 -->
                        <div v-for="item in searchInterestAlbum" :key="item.id" class="interest-album">
                            <div class="interest-album-pict">
                                <img class="auto-img" :src="item.blurPicUrl+'?param=53y53'" alt="">
                            </div>
                            <div class="interest-album-title one-txt-cut">{{item.name}}</div>
                        </div>
                    </div>
                </div>
            </transition>
                <!-- 导航栏的单曲列表 -->
            <transition>
                <div v-show="active==0"  class="searchAll-content">
                    <div>
                        <div class="searchAll-content-title">
                            <div class="one">单曲</div>
                            <div class="searchAll-content-title-right">
                                <span class="iconfont icon-bofang">播放全部</span>
                            </div>
                        </div>
                    </div>
                    <ul v-if="searchAllMusicList">
                        <li @click="setSearchMusicID(item.id)" v-for="item in searchAllMusicList" :key="item.id" >
                            <div class="searchAll-content-li-left">
                                <div class="li-left-name">{{item.name}}</div>
                                <div class="li-left-author">
                                    <span class="musicType" style="margin-right:4px">vip</span>
                                    <span class="musicType" style="margin-right:6px">SQ</span>
                                    <span v-for="(data,index) in item.ar" :key="index" >{{data.name}} </span>
                                    <!-- <span>华晨宇 </span>
                                    <span>范逸臣 </span> -->
                                    <span>- {{item.al.name}}</span>
                                </div>
                            </div>
                            <div class="searchAll-content-li-right">
                                <span class="iconfont icon-gengduo"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </transition>
            <!-- 导航栏的歌单列表 -->
            <transition>
                <div v-show="active==1" class="searchAll-content-lists">
                    <router-link tag="div" :to="'/songList?id='+item.id" v-for="item in searchAllMusicSheet" :key="item.id" class="searchAll-content-MusicLists">
                        <div class="content-MusicLists-pict">
                            <img class="auto-img" :src="item.coverImgUrl+'?param=53y53'" alt="">
                        </div>
                        <div class="content-MusicLists-title">
                            <p class="title-name one-txt-cut">{{item.name}}</p>
                            <p class="title-content one-txt-cut"><span>{{item.trackCount}}首</span><span>By: {{item.creator.nickname}}</span><span>播放{{item.playCount|playcountData}}次</span></p>
                        </div>
                    </router-link>
                </div>
            </transition>
            <!-- 导航栏的专辑列表 -->
            <transition-group tag="div" style="background-color:#fff;margin-top: 90px;">
                <div v-show="active==2" v-for="item in searchAllSingerAlbum" :key="item.id" class="searchAll-content-album">
                    <div class="content-album">
                        <div class="content-album-pict">
                            <img class="auto-img" :src="item.picUrl+'?param=53y53'" alt="">
                        </div>
                        <div class="content-album-title">
                            <div class="album-title-name">{{item.name}}</div>
                            <div class="album-title-content">
                                <span class="highName">华晨宇</span>
                                <span>2022.12.20</span>
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>
            <!-- 导航栏的视频列表 -->
            <div v-show="active==3" class="searchAll-content-MV">
                <div v-for="item in searchAllSingerMv" :key="item.id" class="content-MV-item">
                    <div class="MV-item-pict">
                        <span>{{item.duration|playTime}}</span>
                        <img class="auto-img" :src="item.cover+'?param=150y85'" alt="">
                    </div>
                    <div class="MV-item-title">
                        <p class="txt-cut">{{item.name}}</p>
                        <span class="highName">{{item.artistName}}</span>
                        <span>{{item.playCount|playcountData}}播放</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getSearchKeywords,getSearchMultimatch} from "../api/search"
export default {
    props:["searchText"],
    data() {
        return {
            active:0,// 索引号
            // 搜索页面的导航栏数组
            searchAllNav:[
                '单曲',
                '歌单',
                '专辑',
                '视频',
                '歌手',
                '歌词',
                '播客'
            ],
            searchAllMusicList:[],//关键字搜索的歌曲列表
            searchInterestSinger:[],//根据关键字搜索的感兴趣的歌手
            searchInterestAlbum:[],//根据关键字搜索的感兴趣的歌手的专辑
            searchAllMusicSheet:[],//关键字搜索的歌单列表
            searchAllSingerAlbum:[],//关键字搜索的歌单
            searchAllSingerMv:[],//关键字搜索的视频

        }
    },
    methods:{
        getSearchKeywordsFun(){
            // 关键字搜索的歌曲列表
            getSearchKeywords({keywords:this.searchText}).then(data=>{
                this.searchAllMusicList = data.result.songs
                // console.log(this.searchAllMusicList);
                // console.log(data);
            })
            // 关键字搜索的感兴趣的歌手及专辑
            getSearchMultimatch({keywords:this.searchText}).then(data=>{
                this.searchInterestSinger = data.result.artist
                this.searchInterestAlbum = data.result.album
                // console.log(data);
                // console.log(this.searchInterestAlbum);
            })
            // 关键字搜索的歌单列表
            getSearchKeywords({keywords:this.searchText,type:1000}).then(data=>{
                this.searchAllMusicSheet = data.result.playlists
                // console.log(this.searchAllMusicSheet);
            })
            // 关键字搜索的歌手的专辑
            getSearchKeywords({keywords:this.searchText,type:10}).then(data=>{
                this.searchAllSingerAlbum = data.result.albums
                // console.log(this.searchAllSingerAlbum);
            })
            // 关键字搜索的歌手的视频
            getSearchKeywords({keywords:this.searchText,type:1004}).then(data=>{
                this.searchAllSingerMv = data.result.mvs
                console.log(this.searchAllSingerMv);
            })
        },
        BackSearch(){
            this.$router.push("/search")
        },
        // 导航栏点击切换
        navActive(index){
            this.active = index
        },
        // 将歌曲的id传给App.js播放音乐
        setSearchMusicID(id){
            this.$emit("getPlayerId",id)
        }
    },
    created(){
        this.getSearchKeywordsFun()
    },
    // 过滤器,将数量以万显示
    filters:{
        playcountData(value){
            if(value<10000){
                return value
            }
            let w = value>10000?value/10000:value;
            let y = w>10000? parseInt(w/10000)+"亿":parseInt(w)+"万"
            return y
        },
        playTime(value){
            let m = parseInt(value/1000/60)//分
            let s = parseInt(value/1000%60)//秒
            return  (m<10?'0'+m:m)+':'+(s<10?'0'+s:s)
        }
    }
}
</script>

<style lang="scss">
.searchAll {
    position: relative;
    width: 100%;
    // height: 100vh;
    background: #f5f5f5;
    .searchAll-top {
        position: fixed;
        top: 0;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        // height: 42px;
        background: #fff;
        line-height: 50px;
        padding: 0 15px;
        .searchAll-top-center {
            display: flex;
            align-items: center;
            width: 79.2%;
            height: 22px;
            background: #f8f8f8;
            border-radius: 20px;
            padding-left: 10px;
            i {
                margin-right: 7px;
            }
            input {
                width: 85%;
                height: 22px;
                font-size: 12px;
                background: #f8f8f8;
            }
        }
    }
    .searchAll-top-nav {
        position: fixed;
        top: 50px;
        z-index: 10;
        width: 100%;
        height: 50px;
        // padding-top: 13px;
        display: flex;
        align-items: center;
        background: #fff;
        // margin-bottom: 10px;
        // &::after {
        //     content: '';
        //     position: absolute;
        //     left: 10px;
        //     bottom: 0;
        //     display: block;
        //     width: 24px;
        //     height: 4px;
        //     background: red;
        // }
        div {
            position: relative;
            padding: 0 10px;
            padding-bottom: 6px;
            font-size: 12px;
            border-bottom: 3px solid transparent;
        }
        .top-nav-list.active{
            border-bottom: 3px solid red;
        }
    }
    .searchAll-top-interest {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        margin-top: 100px;
        padding-top: 15px;
        .top-interest-content {
            width: 100%;
            padding: 10px;
            border-radius: 10px;
            background: #fff;
            .interest-title{
                margin-bottom: 10px;
            }
            .interest-singer{
                display: flex;
                align-items: center;
                width: 100%;
                margin-bottom: 10px;
                .singer-pict{
                    width: 53px;
                    height: 53px;
                    margin-right: 10px;
                    border-radius: 50%;
                    overflow: hidden;
                }
                .singer-info{
                    .singer-info-name {
                        max-width: 270px;
                        margin-bottom: 4px;
                        .highName {
                            color: #295f9d;
                        }
                    }
                    .fans-music {
                        color: #a3a3a3;
                        font-size: 12px;
                    }
                }
            }
            .interest-album {
                display: flex;
                align-items: center;
                width: 100%;
                margin-bottom: 10px;
                .interest-album-pict {
                    width: 53px;
                    height: 53px;
                    border-radius: 10px;
                    margin-right: 10px;
                    overflow: hidden;
                }
                .interest-album-title {
                    max-width: 230px;
                }
            }
        }
    }
    .searchAll-content {
        width: 100%;
        padding: 0 10px;
        .searchAll-content-title {
            width: 100%;
            height: 35px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            background: #fff;
            padding: 0 10px;
            padding-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .searchAll-content-title-right {
                border: 1px solid transparent;
                border-color: #ff1818;
                border-radius: 20px;
                padding: 2px 4px;
                span {
                    color: #ff1818;
                    display: block;
                    transform: scale(0.8);
                    font-size: 12px;
                }
            }
        }
        ul {
            width: 100%;
            // height: 100vh;
            background: #fff;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            padding-bottom: 30px;
            li {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 14px 10px;
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    left: 10px;
                    bottom: 0;
                    width: calc(100% - 20px);
                    height: 2px;
                    background: #f1f1f1;
                }
                .searchAll-content-li-left{
                    .li-left-name {
                        font-size: 14px;
                        margin-bottom: 6px;
                    }
                    .li-left-author {
                        font-size: 12px;
                        color: #c3c3c3;
                        .musicType{
                            display: inline-block;
                            line-height: 11px;
                            padding: 1px;
                            color: #ff1818;
                            border: 1px solid #ff1818;
                            border-radius: 5px;
                        }
                        .singer {
                            display: inline-block;
                            max-width: 125px;
                        }
                        .album {
                            display: inline-block;
                            max-width: 130px;
                        }
                    }
                }
            }
        }
    }
    .searchAll-content-lists {
        width: 100%;
        padding-bottom: 40px;
        background: #fff;
        margin-top: 90px;
        .searchAll-content-MusicLists{
            display: flex;
            align-items: center;
            width: 100%;
            height: 73px;
            padding: 0 10px;
            padding-top: 10px;
            background: #fff;
            .content-MusicLists-pict {
                width: 53px;
                height: 53px;
                margin-right: 10px;
                border-radius: 10px;
                overflow: hidden;
            }
            .content-MusicLists-title {
                .title-name {
                    max-width: 260px;
                    margin-bottom: 8px;
                }
                .title-content {
                    max-width: 260px;
                    font-size: 12px;
                    color: #808080;
                    span {
                        margin-right: 5px;
                    }
                }
            }
        }
    }
    .searchAll-content-album {
        width: 100%;
        .content-album {
            display: flex;
            align-items: center;
            width: 100%;
            height: 70px;
            padding-left: 10px;
            background: #fff;
            .content-album-pict {
                position: relative;
                width: 53px;
                height: 53px;
                border: 1px solid #ccc;
                border-radius: 10px;
                margin-right: 10px;
                // overflow: hidden;
                img {
                    position: absolute;
                    left: 0;
                    top: 0;
                    border-radius: 10px;
                }
                &::before {
                    content: '';
                    position: absolute;
                    left: 4px;
                    top: -5px;
                    display: block;
                    width: 45px;
                    height: 45px;
                    background: #272727;
                    border-radius: 50%;
                }
            }
            .content-album-title {
                .album-title-name {
                    margin-bottom: 8px;
                }
                .album-title-content{
                    color: #808080;
                    font-size: 12px;
                    .highName {
                        color: #295f9d;
                    }
                }
            }
        }
    }
    .searchAll-content-MV {
        margin-top: 100px;
        width: 100%;
        background: #fff;
        padding-bottom: 30px;
        .content-MV-item {
            display: flex;
            align-items: center;
            padding: 0 10px;
            margin-bottom: 15px;
            background: #fff;
            .MV-item-pict {
                position: relative;
                width: 150px;
                height: 85px;
                margin-right: 10px;
                border-radius: 15px;
                overflow: hidden;
                border: 1px solid #ccc;
                span {
                    position: absolute;
                    right: 10px;
                    bottom: 10px;
                    font-size: 12px;
                    color: #fff;
                }
            }
            .MV-item-title {
                display: flex;
                flex-direction: column;
                p {
                    max-width: 180px;
                    margin-bottom: 10px;
                }
                span {
                    font-size: 12px;
                    color: #808080;
                }
                .highName {
                    color: #295f9d;
                }
            }
        }

    }
}

.v-leave-to {
    opacity: 0.5;
    transform: translateX(-100%);
}

.v-enter {
    opacity: 0.5;
    transform: translateX(-100%);
}

.v-leave-active,.v-enter-active {
    transition: all 0.2s linear;
}
</style>