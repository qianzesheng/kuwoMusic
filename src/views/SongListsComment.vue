<template>
    <div>
        <div class="comment">
            <!-- 顶部按钮---返回首页 -->
            <div class="comment-top">
                <router-link tag="div" to="#" class="comment-top-left">
                    <router-link tag="i" :to="'/songList?id='+SongListID" class="iconfont i-right icon-arrow-left-bold"></router-link>
                    <span>评论</span>
                    <span style="font-weight:700">(68)</span>
                </router-link>
                <div class="comment-top-right">
                    <!-- <i class="iconfont i-right icon-search"></i> -->
                    <div class="three-dian">
                        <i class="iconfont icon-31fenxiang">
                        </i>
                    </div>
                </div>
            </div>
            <!-- 图片加标题 -->
            <div class="comment-title">
                <div class="comment-title-pict">
                    <img :src="SongListCommentCover+'?param=45y45'" alt="">
                    <div class="comment-title-content">
                        <p class="one-txt-cut">{{SongListCommentTitle}}</p>
                        <p>by<span>{{SongListCommentNickname}}</span></p>
                    </div>
                </div>
                <div class="comment-title-right">
                    <span class="iconfont icon-arrow-right-bold"></span>
                </div>
            </div>
            <div class="comment-item">
                <van-sticky :offset-top="50">
                    <!-- <van-button type="info">吸顶距离</van-button> -->
                    <div class="comment-item-title">
                        <div class="title-left">评论区</div>
                        <div class="title-right">
                            <span @click="toggleType('content')" :class="{'con':SongListCommentType=='content'}">推荐</span>
                            <span @click="toggleType('hot')" :class="{'con':SongListCommentType=='hot'}">最热</span>
                            <span @click="toggleType('newsong')" :class="{'con':SongListCommentType=='newsong'}">最新</span>
                        </div>
                    </div>
                </van-sticky>
                <ul>
                    <li v-for="(item,index) in changeComment()" :key="index">
                        <div class="li-pict">
                            <img class="auto-img" :src="item.user.avatarUrl+'?param=30y30'" alt="">
                        </div>
                        <div class="li-content">
                            <div class="li-content-title">
                                <div>
                                    <div class="li-content-title-name">{{item.user.nickname}}</div>
                                    <div class="li-content-title-date">{{item.timeStr}} <span>{{item.ipLocation.location}}</span> </div>
                                </div>
                                <!-- 点赞的图标 -->
                                <div class="good">
                                    <span>{{item.likedCount|goodNum}}</span>
                                    <span @click="good(goodType)">
                                        <span @click="setGoodIndex(index)" :class="['iconfont' ,{'con':goodIndex==index},'icon-shoucang']"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="comment-content">
                            <p>{{item.content}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 底部的评论框 -->
            <div class="comment-input">
                <div class="input">
                    <input type="text" placeholder="写评论...">
                </div>
                <div class="comment-input-right">
                    <span class="iconfont icon-pinglun"></span>
                    <span>发送</span>
                </div>
            </div>
        </div>
    </div>
</template>

// <script>
import { getSongDetail } from "../api/comment";
import { getPlaylistDetail } from "../api/SongLists";
export default {
    props:["MusicListID"],
    data() {
        return {
            SongListID:'',//歌单id
            SongListCommentArr:[],//歌单评论--推荐评论
            SongListCommentHotArr:[],//歌单评论--最热评论
            SongListCommentNewArr:[],//歌单评论--最新评论
            SongListCommentType:'content',//歌单评论的类型, content是推荐, hot是最热, new是最新
            SongListCommentTitle:'',//歌单评论顶部对应的歌单标题
            SongListCommentNickname:'',//歌单评论顶部对应的歌单作者
            SongListCommentCover:'',//歌单评论顶部对应的歌单图片
            SongListCommentContentID:'',//歌单每一条评论内容对应的id
            goodType:'0',//点赞类型, 0是取消点赞, 1是点赞
            goodIndex:null,
        }
    },
    methods:{
        setGoodIndex(index){
            this.goodIndex = index
        },
        getSongDetailFun(){
            // console.log(this.$route.query.id);
            getSongDetail({id:this.$route.query.id,limit:40}).then(data=>{
                console.log(data);
                this.SongListCommentArr = data.comments
                this.SongListCommentHotArr = data.hotComments
                this.SongListCommentNewArr = data.topComments
                // console.log(this.SongListCommentArr);
            })
        },

        getPlaylistDetailFun(){
            getPlaylistDetail({id:this.$route.query.id}).then(data=>{
                // console.log(data);
                this.SongListCommentTitle = data.playlist.name
                this.SongListCommentNickname = data.playlist.creator.nickname
                this.SongListCommentCover = data.playlist.coverImgUrl
                this.SongListID = data.playlist.id
            })
        },
        // 切换评论的类型
        toggleType(type){
            this.SongListCommentType = type
        },
        // 切换推荐/最热/最新
        changeComment(){
            if(this.SongListCommentType=='content'){
                return this.SongListCommentArr
            }else if(this.SongListCommentType=='hot'){
                return this.SongListCommentHotArr
            }else if(this.SongListCommentType=='newsong'){
                return this.SongListCommentNewArr
            }
        },
        // 点赞切换
        good(type){
            this.goodType = type=='0'?'1':'0'   
        }
    },

    created(){
        this.getSongDetailFun()
        this.getPlaylistDetailFun()
    },
    filters:{
        goodNum(num){
            if(num<10000){
                return num
            }
            let w = num>10000?parseInt(num/10000):parseInt(num);
            let bw = w>10000?parseInt(w/1000)+"万":parseInt(w)+"万"
            return bw
        }
    }
}
</script>

<style lang="scss">
.comment {
    width: 100%;
    position: relative;
    background: #f7f7f7;
    padding-top: 50px;
    .comment-top {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;
        padding: 0 15px;
        color: #000;
        background: #fff;
        .comment-top-left {
            line-height: 50px;
        }
        .comment-top-right {
            line-height: 50px;
            .three-dian {
                text-align: center;
                width: 30px;
                display: inline-block;
                // transform: rotate(90deg);
            }
        }
        .i-right {
            margin-right: 10px;
        }
        i {
            font-size: 18px;
        }
    }
    .comment-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 55px;
        padding: 0 10px;
        background: #fff;
        margin-bottom: 6px;
        .comment-title-pict {
            display: flex;
            align-items: center;
            img {
                width: 45px;
                height: 45px;
                display: block;
                margin-right: 6px;
                border-radius: 5px;
            }
            .comment-title-content {
                p {
                    font-size: 14px;
                    &:first-child{
                        margin-bottom: 6px;
                        max-width: 240px;
                    }
                    span {
                        color: #5b85b4;
                    }       
                }
            }
        }
    }
    .comment-item {
        position: relative;
        width: 100%;
        background: #fff;
        padding-left: 10px;
        .van-sticky {
            padding-left: 0px;
        }
        .comment-item-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 26px;
            padding-right: 10px;
            // padding-left: 10px;
            font-size: 12px;
            background: #fff;
            .title-left {
                padding-left: 10px;
            }
            .title-right{
                span {
                    margin: 0 6px;
                    color: #9a9a9a;
                    &.con{
                        color: #000;
                        font-weight: bold;
                    }
                }
            }
        }
        ul {
            li{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                padding-top: 5px;
                border: 1px solid transparent;
                border-bottom-color: #efefef;
                .li-pict {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    overflow: hidden;
                }
                .li-content {
                    width: 325px;
                    .li-content-title {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 8px;
                        padding-right: 10px;
                        div {
                            transform: scale(0.9);
                            .li-content-title-name {
                                font-size: 14px;
                                margin-bottom: 2px;
                            }
                            .li-content-title-date {
                                font-size: 12px;
                            }
                        }
                    }
                    .good {
                        display: flex;
                        align-items: center;
                        span {
                            font-size: 12px;
                        }
                        .iconfont {
                            margin-left: 4px;
                        }
                        .con {
                            color: red;
                        }
                    }
                }
                .comment-content {
                    font-size: 12px;
                    padding-left: 48px;
                    padding-right: 10px;
                    p {
                        padding-bottom: 10px;
                    }
                }
            }
        }
    }
    .comment-input {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 10;
        width: 100%;
        height: 32px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid transparent;
        border-top-color: #f0f0f0;
        .input {
            width: 70%;
            input {
                width: 100%;
                height: 31px;
                font-size: 12px;
                padding-left: 10px;
            }
        }
        .comment-input-right {
            display: flex;
            align-items: center;
            padding-right: 10px;
            font-size: 12px;
            span {
                &:last-child {
                    margin-left: 4px;
                }
            }
        }
    }
}
</style>