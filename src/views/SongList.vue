<template>
    <div>
        <div class="SongLists" v-if="musicList">
            <!-- 有背景图的大div -->
            <div class="bg" :style="{'background-image':'url('+musicList.coverImgUrl+'?param=140y140)'}">
                <!-- 顶部按钮---返回首页 -->
                <div class="SongLists-top">
                    <router-link tag="div" to="/home" class="SongLists-top-left">
                        <i class="iconfont i-right icon-arrow-left-bold"></i>
                        <span>歌单</span>
                    </router-link>
                    <div class="SongLists-top-right">
                        <i class="iconfont i-right icon-search"></i>
                        <div class="three-dian">
                            <i class="iconfont icon-gengduo"></i>
                        </div>
                    </div>
                </div>
                <!-- 歌单内容详情部分 -->
                <div class="SongLists-content">
                    <div class="content-picAtitle">
                        <div class="content-pict">
                            <img class="auto-img" :src="musicList.coverImgUrl+'?param=95y95'" alt="">
                            <div class="player">
                                <span class="iconfont icon-bofang"></span>
                                {{musicList.playCount | playcountData}}
                            </div>
                        </div>
                        <div class="content">
                            <div class="content-title">
                                <h3 class="one-txt-cut">{{musicList.name}}</h3>
                                <div class="round">
                                    <span class="iconfont icon-arrow-down-bold"></span>
                                </div>
                            </div>
                            <div class="right">
                                <div class="type">标签: {{musicList.tags.length==0?"暂无标签":''}}
                                    <span v-for="(Type,index) in musicList.tags" :key="index" >{{Type}}</span>
                                </div>
                                <div class="b-content">
                                    <p class="one-txt-cut content-p">{{musicList.description}}</p>
                                    <span class="iconfont icon-arrow-right-bold" ></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="SongLists-btn">
                        <div class="btn">
                            <span class="iconfont icon-shoucang2"></span>
                            {{musicList.subscribedCount | playcountData}}
                        </div>
                        <router-link  tag="div" :to="'/comment/playlist?id='+musicListID" class="btn">
                            <span class="iconfont icon-pinglun"></span>
                            {{musicList.commentCount | playcountData}}
                        </router-link>
                        <div class="btn R-btn">
                            <span class="iconfont icon-31fenxiang"></span>
                            {{musicList.shareCount | playcountData}}
                        </div>
                    </div>
                </div>
            </div>
            <!-- 歌曲列表 -->
            <div class="music-item">
                <van-sticky :offset-top="0">
                    <div class="item-title">
                        <div @click="playAllID" class="title-left">
                            <div class="round">
                                <span class="iconfont icon-bofang"></span>
                            </div>
                            <div class="playAll">播放全部
                                <span>({{musicList.tracks.length}})</span>
                            </div>
                        </div>
                        <div class="title-right">
                            <span class="iconfont icon-xiazai2"></span>
                            <span class="iconfont icon-quanxuan"></span>
                        </div>
                    </div>
                </van-sticky>
                <div class="item-list">
                    <ul>
                        <li @click="setPlayId(item.id)" v-for="(item,index) in musicList.tracks" :key="index" class="music-list">
                            <div class="li-left">
                                <div class="num">{{index+1}}</div>
                                <div class="music-box">
                                    <div class="music-name one-txt-cut">{{item.name}}
                                        <!-- <span>(歌曲的英文名)</span> -->
                                    </div>
                                    <div class="music-author one-txt-cut">
                                        <span>{{item.ar[0].name}}</span>
                                        <span>-{{item.al.name}}</span>
                                    </div>
                                </div>    
                            </div>
                            <div class="li-right">
                                <span class="iconfont icon-bofang1"></span>
                                <span class="iconfont threedian icon-gengduo"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { getPlaylistDetail } from "../api/SongLists";
export default {
    data() {
        return {
            musicList:null,//歌单列表
            musicListID:'',//歌单对应的ID
        }
    },
    methods:{
        getPlaylistDetailFun(){
            getPlaylistDetail({id:this.$route.query.id}).then(data=>{
                // console.log(data);
                this.musicList = data.playlist
                this.musicListID = data.playlist.id
                this.musicListTitle = data.playlist.name
            })
        },
        setPlayId(id){
            this.$emit("getPlayerId",id)
            console.log(id);
            this.$emit("getPlayAllID",this.$route.query.id);
        },
        playAllID(){
            this.$emit("getPlayerId",this.musicList.tracks[0].id);//播放列表默认第一首歌
            this.$emit("getPlayAllID",this.$route.query.id)
        },
    },
    // 生命周期
    created(){
        if("id" in this.$route.query){
            this.getPlaylistDetailFun()//数据列表
        }else{
            this.$router.push("/home")
        }
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

<style lang="scss">

.SongLists {
    width: 100%;
    // overflow: hidden;
    .bg{
        background: url("https://p1.music.126.net/ZVMvmb599lEPF2KxTt9gvQ==/109951165807960507.jpg?param=140y140") no-repeat center top;
        background-size: 3000px;
        // filter: blur(1px);
        width: 100%;
        // height: 100%;
        border-bottom-right-radius: 50% 5px;
        border-bottom-left-radius: 50% 5px;
        .SongLists-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 50px;
            padding: 0 15px;
            color: #ccc;
            // background: pink;
            .SongLists-top-left {
                line-height: 50px;
            }
            .SongLists-top-right {
                line-height: 50px;
                .three-dian {
                    text-align: center;
                    width: 30px;
                    display: inline-block;
                    transform: rotate(90deg);
                }
            }
            .i-right {
                margin-right: 10px;
            }
            i {
                font-size: 18px;
            }
        }
        .SongLists-content {
            width: 100%;
            // height: 95px;
            padding: 0 10px;
            .content-picAtitle {
                display: flex;
                width: 100%;
                height: 95px;
                // background: skyblue;
                .content-pict {
                    position: relative;
                    width: 95px;
                    height: 95px;
                    border-radius: 15px;
                    overflow: hidden;
                    margin-right: 12px;
                    .player {
                        position: absolute;
                        right: 2px;
                        top: 2px;
                        transform: scale(0.9);
                        font-size: 10px;
                        color: #fff;
                        span {
                            font-size: 12px;
                        }
                    }
                }
                .content {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 95px;
                    padding: 4px 0;
                    color: #ccc;
                    .content-title {
                    display: flex;
                    justify-content: space-between;
                        h3 {
                            width: 170px;
                            margin-right: 55px;
                            font-size: 14px;
                        }
                        .round {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 20px;
                            height: 20px;
                            border: 2px solid #bdb7c0;
                            border-radius: 50%;
                            .iconfont {
                                font-size: 14px;
                                color: #bdb7c0;
                            }
                        }
                    }
                    .content-p {
                        display: inline-block;
                        max-width: 220px;
                        margin-right: 6px;
                        font-size: 12px;
                    }
                    .right {
                        line-height: 16px;
                        .type {
                            max-width: 220px;
                            font-size: 12px;
                            span {
                                margin-right: 4px;
                            }
                        }
                        .b-content {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-top: 4px;
                            .iconfont {
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
            .SongLists-btn {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 50px;
                // background: lightcoral;
                .btn {
                    width: 30%;
                    height: 30px;
                    padding: 0 2px;
                    line-height: 30px;
                    text-align: center;
                    color: #fff;
                    background: #999999;
                    border-radius: 20px;
                    opacity: 0.7;
                    .iconfont {
                        font-size: 18px;
                    }
                }
                .R-btn {
                    background-image: linear-gradient(#ff235d,#ff3c3f);
                }
            }
        }
    }
    .music-item {
        width: 100%;
        // height: 300px;
        margin-top: 4px;
        padding: 0 12px;
        .item-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 54px;
            padding-left: 8px;
            background: white;
            .title-left {
                display: flex;
                .round {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 15px;
                height: 15px;
                margin-right: 12px;
                background: #ff2c1e;
                border-radius: 50%;
                    .iconfont {
                        transform: scale(0.4);
                        color: #fff;
                    }
                }
                .playAll {
                    font-weight: 700;
                    &>span{
                        color: #adadad;
                        font-size: 12px;  
                        font-weight: normal;
                    }
                }
            }
            .title-right {
                .iconfont {
                    color: #828282;
                    font-size: 20px;
                    margin-left: 14px;
                }
            }
        }
        .item-list {
            width: 100%;
            .music-list {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 34px;
                margin-bottom: 14px;
                .li-left {
                    display: flex;
                    .num {
                        width: 30px;
                        height: 34px;
                        margin-right: 6px;
                        line-height: 34px;
                        text-align: center;
                        color: #b7b7b7;
                    }
                    .music-box {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        height: 34px;
                        max-width: 180px;
                        .music-name {
                            font-size: 14px;
                            font-weight: 700;
                            color: #262626;
                            span{
                                color: #adadad;
                                font-weight: normal;
                                font-size: 12px;
                            }
                        }
                        .music-author {
                            font-size: 12px;
                            font-weight: normal;
                            color: #adadad;
                        }
                    }
                }
                .li-right {
                    .iconfont {
                        color: #b1b1b1;
                        font-size: 22px;
                        margin-left: 3px;
                    }
                    .threedian {
                        text-align: center;
                        width: 30px;
                        display: inline-block;
                        transform: rotate(90deg) translateY(-4px);
                    }
                }
            }
        }
    }
}
</style>