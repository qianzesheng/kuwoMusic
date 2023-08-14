<template>
    <div>
        <div class="userView">
            <div class="userhead">
                <div class="userhead-btn">
                    <router-link tag="span" to="/home" class="iconfont icon-arrow-left-bold"></router-link>
                    <span class="iconfont icon-gengduo"></span>
                </div>
                <div class="userhead-info">
                    <!-- 用户头像 -->
                    <div class="userhead-info-pic">
                        <img class="auto-img" :src="userheadPic+'?param=50y50'" alt="">
                    </div>
                    <!-- 用户名字 -->
                    <div class="userhead-info-name">{{userheadName}}</div>
                    <!-- 用户等级,关注,粉丝 -->
                    <div class="userhead-info-people">
                        <div class="info-people-guanzhu">12关注</div>
                        <div class="info-people-fans">9粉丝</div>
                        <div class="info-people-level">lv.7</div>
                    </div>
                    <!-- 用户标签,ip属地 -->
                    <div class="userhead-info-type">
                        <div class="info-type-list">ip属地: 广东</div>
                        <div class="info-type-list">华晨宇乐迷</div>
                        <!-- <div class="info-type-list">00后水瓶座</div> -->
                        <div class="info-type-list">日常摸鱼中</div>
                        <div class="info-type-list">峡谷小学生</div>
                        <div class="info-type-list">
                            <span class="iconfont icon-arrow-right-bold"></span>
                        </div>
                    </div>
                    <!-- 编辑资料 -->
                    <div class="userhead-info-edit">
                        <div class="info-edit-btn">编辑资料</div>
                        <div class="info-edit-btn btn-round">
                            <span class="iconfont icon-arrow-down-bold"></span>
                        </div>
                    </div>
                    <div class="userhead-info-bg"></div>
                </div>
            </div>
            <!-- 选项卡主页,动态,播客 -->
            <div class="userTab">
                <div class="tab">主页</div>
                <div class="tab">动态</div>
                <div class="tab">播客</div>
            </div>
            <!-- 用户基本信息 -->
            <div class="userintro">
                <div class="userintro-bg"></div>
                <div class="userintro-title">
                    <div class="userintro-title-left">基本信息</div>
                    <div class="userintro-title-right">领取村民证</div>
                </div>
                <div class="tabCard">
                    <div class="userintro-age">村龄: 6年(2016年11月注册)</div>
                    <div class="userintro-sex">性别: 男</div>
                    <div class="userintro-year">年龄: 00后 水瓶座</div>
                    <div class="userintro-person">个人简介: 这个人很懒,没有写个人简介</div>
                </div>
            </div>
            <div class="userhead-create">
                <div v-if="createMusicList" class="userhead-create-bg">
                    <div class="userhead-create-bg-title">
                        创建的歌单<span>({{createMusicList.length}}个)</span>
                    </div>
                    <router-link :to="'/songList?id='+item.id" tag="div" v-for="item in createMusicList" :key="item.id" class="userhead-create-musicList">
                        <div class="create-musicList-pict">
                            <img class="auto-img" :src="item.coverImgUrl+'?param=30y30'" alt="">
                        </div>
                        <div class="create-musicList-content">
                            <p class="one-txt-cut">{{item.name}}</p>
                            <p class="one-txt-cut"><span>{{item.trackCount}}首</span><span>播放{{item.playCount|playcountData}}次</span></p>
                        </div>
                    </router-link>
                </div>

                <div v-if="collectMusicList" class="userhead-create-bg">
                    <div class="userhead-create-bg-title">
                        收藏的歌单<span>({{collectMusicList.length}}个)</span>
                    </div>
                    <router-link :to="'/songList?id='+item.id" tag="div" v-for="item in collectMusicList" :key="item.id" class="userhead-create-musicList">
                        <div class="create-musicList-pict">
                            <img class="auto-img" :src="item.coverImgUrl+'?param=30y30'" alt="">
                        </div>
                        <div class="create-musicList-content">
                            <p class="one-txt-cut">{{item.name}}</p>
                            <p class="one-txt-cut"><span>{{item.trackCount}}首</span><span>By: {{item.creator.nickname}}</span><span>播放{{item.playCount|playcountData}}次</span></p>
                        </div>
                    </router-link>
                </div>
            </div>
            <!-- 用户中心的大背景 -->
            <div class="userViewBg"></div>
        </div>

        <!-- <button @click="logout">退出登录</button> -->
    </div>
</template>

<script>
import {getUserAccount,getUserDetail,getUserPlaylist} from "../api/user"
import {getLogout} from "../api/login"
export default {
    data() {
        return {
            myID :'',//登录后获取到我的个人ID
            userheadPic:"",//用户头像
            userheadName:"",//用户名称
            createMusicList:[],//创建的歌单
            collectMusicList:[],//收藏的歌单
            
        }
    },
    methods:{
        // 退出登录
        logout(){
            window.localStorage.setItem("userId","");
            window.localStorage.setItem("token","");
            getLogout().then(data=>{
                console.log("退出登录",data);
            })
            this.$router.push("/home");
        },
        getUserAccountFun(){
            getUserAccount().then(data=>{
            // console.log(data);
            this.myID = data.profile.userId
            window.localStorage.setItem("userId",data.profile.userId)
            // console.log(this.myID);
            getUserDetail({uid:this.myID}).then(data=>{
                // console.log(data);
                this.userheadPic = data.profile.avatarUrl
                this.userheadName = data.profile.nickname
            }),
            // 获取用户全部歌单
            getUserPlaylist({uid:this.myID}).then(data=>{
                console.log(data);
                this.createMusicList = data.playlist.slice(1,6)
                this.collectMusicList = data.playlist.slice(6,14)
                console.log(this.collectMusicList);
                })
            })
        }
    },
    created(){
        this.getUserAccountFun()
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

.userView {
    position: relative;
    width: 100%;
    padding-bottom: 30px;
    padding-top: 150px;
    .userhead {
        width: 100%;
        padding: 0 10px;
        .userhead-btn {
            position: fixed;
            top: 0px;
            z-index: 10;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 60px;
            background: url('../assets/images/loginbg.jpg') no-repeat;
            background-position: top left;
            background-size: cover;
            padding-right: 25px;
            line-height: 40px;
            color: #fff;
        }
        .userhead-info {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 150px;
            padding-top: 25px;
            .userhead-info-pic {
                position: absolute;
                top: -30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                background: transparent;
            }
            .userhead-info-name{
                color: #fff;
                font-size: 16px;
                height: 16px;
                margin-bottom: 8px;
            }
            .userhead-info-people {
                display: flex;
                align-items: center;
                font-size: 12px;
                color: #111;
                line-height: 23px;
                margin-bottom: 8px;
                color: #fff;
                div {
                    margin-right: 12px;
                }
            }
            .userhead-info-type {
                display: flex;
                justify-content: center;
                margin-bottom: 6px;
                color: #fff;
                div {
                    background: #999;
                    opacity: 0.9;
                    border-radius: 10px;
                    padding: 2px 5px;
                    font-size: 12px;
                    transform: scale(0.9);
                    .iconfont {
                        color: #fff;
                    }
                }
            }
            .userhead-info-edit {
                display: flex;
                align-items: center;
                height: 28px;
                color: #fff;
                div{
                    border: 1px solid transparent;
                    border-color: #999;
                    border-radius: 20px;
                    font-size: 12px;
                    padding: 5px 10px;
                    margin-right: 5px;
                    color: #fff;
                    .iconfont {
                        font-size: 12px;
                    }
                }
                .btn-round {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                }
            }
            .userhead-info-bg {
                position: absolute;
                top: 0;
                left: 0;
                z-index: -3;
                width: 100%;
                height: 150px;
                background: #ccc;
                opacity: 0.3;
                border-radius: 10px;
            }
        }
    }
    .userTab {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 34px;
        font-size: 14px;
        color: #fff;
    }
    .userintro {
        position: relative;
        width: 100%;
        padding: 10px;
        color: #fff;
        margin-bottom: 10px;
        .userintro-bg {
            position: absolute;
            left: 10px;
            top: 0;
            z-index: -3;
            width: calc(100% - 20px);
            height: 158px;
            background: #ccc;
            opacity: 0.3;
            border-radius: 10px;
        }
        .userintro-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 0 10px;
            margin-bottom: 10px;
            color: #fff;
            .userintro-title-left {
                font-size: 18px;
            }
            .userintro-title-right {
                border: 1px solid transparent;
                border-color: #999;
                border-radius: 20px;
                padding: 3px 10px;
                font-size: 12px;
            }
        }
        .tabCard {
            padding: 0 10px;
            font-size: 12px;
            color: #ccc;
            div {
                margin-bottom: 10px;
            }
        }
    }
    .userhead-create {
        width: 100%;
        padding: 0 10px;
        .userhead-create-bg {
            width: 100%;
            // padding: 10px;
            padding: 10px 10px 1px;
            border-radius: 10px;
            margin-bottom: 10px;
            background: rgba(204, 204, 204, 0.3);
            .userhead-create-bg-title{
                color: #fff;
                margin-bottom: 10px;
                span {
                    color: #ccc;
                    font-size: 12px;
                }
            }
            .userhead-create-musicList {
                display: flex;
                align-items: center;
                width: 100%;
                margin-bottom: 8px;
                .create-musicList-pict {
                    width: 30px;
                    height: 30px;
                    border-radius: 5px;
                    overflow: hidden;
                    // margin-right: 6px;
                }
                .create-musicList-content {
                    width: 300px;
                    transform: scale(0.9);
                    p {
                        max-width: 300px;
                        &:first-child {
                            color: #fff;
                            font-size: 12px;
                        }
                        span {
                            color: #ccc;
                            margin-right: 4px;
                            font-size: 12px;
                        }
                    }
                }
            }
        }

    }
    .userViewBg {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -4;
        width: 100%;
        height: 100vh;
        background: url('../assets/images/loginbg.jpg') no-repeat;
        background-size: cover;
    }
}
</style>