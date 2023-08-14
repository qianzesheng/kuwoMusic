<template>
    <div>
        <!-- <div class="playerNull" style="width:100%;height:36px"></div> -->
        <!-- 各个页面的公用底部播放器 -->
        <div class="playerCon" v-if="songDetail">
            <div class="mini-play">
                <!-- 旋转的小头像 -->
                <div @click="bigPlayerFlag=true" :class="['rotate',{'pause':iconPlay},'play']">
                    <div class="rotate-img">
                        <img class="auto-img" :src="songDetail.al.picUrl+'?param=22y22'" alt="">
                    </div>
                </div>
                <!-- 歌名加歌手 -->
                <div  class="author">
                    <div class="one-txt-cut author-music">{{songDetail.name}}</div>
                    <div class="one-txt-cut author-name">- {{songDetail.ar[0].name}}</div>
                </div>
                <div class="mini-play-right">
                    <div class="stop_play" @click="togglePlay">
                        <van-circle 
                        v-model="currentPlay" 
                        :rate="currentPlay" 
                        :size="21"
                        :speed="100"  
                        :color="'#4d4d4d'"
                        :layer-color="'#e3e3e3'"
                        />
                        <span :class="['iconfont',iconPlay?'icon-bofang':'icon-zantingtingzhi']"></span>
                    </div>
                    <span class="iconfont icon-zanting1"></span>
                </div>
            </div>
        </div>
        <!-- 大播放器 -->
        <div v-if="bigPlayerFlag" class="position-player">
            <!-- 大播放器 -->
            <div v-if="songDetail" class="bigPlayer">
                <div class="bigPlayer-top">
                    <div @click="bigPlayerFlag=false" class="bigPlayer-topLeft">
                        <span class="iconfont icon-arrow-down-bold"></span>
                    </div>
                    <div class="bigPlayer-topCenter">
                        <div class="one-txt-cut bigPlayer-music">{{songDetail.name}}</div>
                        <div class="one-txt-cut bigPlayer-name">{{songDetail.ar[0].name}}<span>关注</span>
                        </div>
                    </div>
                    <div class="bigPlayer-topRight">
                        <div class="bigPlayer-smallpict">
                            <img class="auto-img" :src="songDetail.al.picUrl" alt="">
                        </div>
                        <span class="iconfont icon-31fenxiang"></span>
                    </div>
                </div>
                <div ref="lyricContent" class="bigPlayer-round">
                    <div @click="bigPlayerUl = !bigPlayerUl" v-show="!bigPlayerUl" class="player-round" >
                        <div class="player-round-line"></div>
                        <div class="player-round-pict">
                            <img :class="['player-round',{'pause':iconPlay},'play']" :src="songDetail.al.picUrl+'?param=185y185'" alt="">
                        </div>
                    </div>
                    <ul :style="{'top':lyricTop+'px'}" @click="bigPlayerUl = !bigPlayerUl" v-show="bigPlayerUl">
                        <li v-for="(item,index) in lyric" :key="index" :class="{'con':currentRow==index}">{{item.lyric}}</li>
                    </ul>
                </div>
                <div class="bigPlayer-func">
                    <div class="love-down-sing">
                        <div>
                            <span class="iconfont icon-shoucang"></span>
                            <span class="iconfont icon-xiazai2"></span>
                            <span class="iconfont icon-changge"></span>
                            <span class="iconfont icon-pinglun"></span>
                            <span class="iconfont icon-gengduo"></span>
                        </div>
                    </div>
                    <div class="bigPlayer-slider">
                        <span>{{setTime(timeLeft)}}</span>
                        <van-slider 
                        v-model="currentPlay" 
                        step='1' 
                        button-size='6'
                        @input="sliderInputFun"
                        @drag-start="sliderDragStartFun"
                        @drag-end="sliderDragEndFun"
                        />
                        <span>{{setTime(timeRight)}}</span>
                    </div>
                    <div class="up-play-down">
                        <div>
                            <div @click="isPlayerType">
                                <span v-if="playerType==1" class="iconfont icon-xunhuan7"></span>
                                <span v-else-if="playerType==2" class="iconfont icon-suiji2"></span>
                            </div>
                            <span @click="prevFun" class="iconfont icon-shangyiqu-wangyiicon"></span>
                            <div class="big-icon">
                                <span @click="togglePlay" :class="['iconfont',iconPlay?'icon-bofang':'icon-zantingtingzhi']"></span>
                            </div>
                            <span @click="nextFun" class="iconfont icon-shangyiqu"></span>
                            <span class="iconfont icon-zanting1"></span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 大播放器模糊的背景 -->
            <div class="bigPlayer-bg"></div>
        </div>
        <audio 
        controls
        :src="songUrl" 
        ref="audio" 
        @timeupdate="ontimeupdateFun" 
        @ended="onendedFun" 
        @loadeddata="onloadeddataFun"
        ></audio>
    </div>
</template>

<script>
import { getSongDetail,getSongUrl,getLyric } from "../../api/player"
import { getPlaylistDetail } from '../../api/SongLists'
export default {
    props:["playerId","playAllID"],
    data() {
        return {
            currentPlay:0,
            songDetail:null,//数据详情
            songUrl:null,//歌曲url
            iconPlay:true,//切换按钮
            timeLeft:0,//左侧时间
            timeRight:0,//右侧时间
            bigPlayerFlag:false,//大播放器的显示和隐藏的开关
            bigPlayerUl:false,//歌词列表与旋转播放器的切换开关
            playAllList:[],//歌单播放全部的歌曲列表
            playerType:1,//控制播放类型, 1是顺序播放,2是随机播放
            lyric:[],//歌词数据数组
            lyricTop:200,//ul的top值控制歌词列表的上下滚动
            currentRow:0,//歌词下标
        }
    },
    methods:{
        getSongDetailFun(){
            getSongDetail({
                ids:this.playerId
            }).then(data=>{
                // console.log(data);
                this.songDetail = data.songs[0];
            })
        },
        getSongUrlFun(){
            getSongUrl({
                id:this.playerId
            }).then(data=>{
                // console.log(data);
                this.songUrl = data.data[0].url;
            })
        },
        getLyricFun(){
            getLyric({id:this.playerId}).then(data=>{
                // console.log(data.lrc.lyric);
                this.setLyricData(data.lrc.lyric)
            })
        },

        // 处理歌词的方法
        setLyricData(text){
            let arr = text.split("\n")
            for(var i = 0;i<arr.length;i++){
                var newArr = arr[i].split("]")
                // newArr.pop()
                var obj={};
                if(newArr[0]){
                    let TimeArr = newArr[0].substring(1).split(":")
                    obj.time = TimeArr[0]*60+Number(TimeArr[1])//得到秒数
                    obj.lyric = newArr[1];//得到歌词
                    obj.height = newArr[1].length>47?2:1//字符串过长设置高度
                    if(newArr[1].length){
                        this.lyric.push(obj)
                    }
                }
            }
            // console.log(this.lyric);
        },

        // 歌词移动效果
        lyricMove(){
            let heightTop = this.$refs.lyricContent.clientHeight/2;
            for(var i = 0;i<this.lyric.length;i++){
                heightTop -= 36*this.lyric[i].height
                if(this.timeLeft<=this.lyric[i].time){
                    this.lyricTop = heightTop
                    this.currentRow = i-1
                    break
                }
            }
        },

        togglePlay(){
            if(this.iconPlay){//播放
                this.$refs.audio.play();
                this.ontimeupdateFun();
            }else{
                this.$refs.audio.pause();
            }
            this.iconPlay = !this.iconPlay
        },

        // 控制歌单列表的播放类型
        isPlayerType(){
            this.playerType = this.playerType==1?2:1
        },

        // 音频进度时间
        ontimeupdateFun(){
            // duration	返回当前音频的长度（以秒计）
            // currentTime	设置或返回音频中的当前播放位置（以秒计）
            this.timeLeft = this.$refs.audio.currentTime;//实时歌曲时间 50
            // 0-200 歌曲时间
            // 0-100 进度条范围
            this.currentPlay = 100 * (this.timeLeft/this.timeRight );
            // console.log(this.timeLeft);
            if(this.lyric.length &&this.bigPlayerFlag){
                this.lyricMove()
            }
        },
        
        // 等待音频数据mp3加载完成
        onloadeddataFun(){
            this.togglePlay();//播放歌曲
            this.timeRight = this.$refs.audio.duration;//总长度 200
        },
        

        // 下一首歌
        nextFun(){
            // 通过id获取当前歌曲下标
            let index = this.playAllList.findIndex(item=>item.id==this.playerId)//下标
            index = index+1>this.playAllList.length-1 ? 0:index+1;
            // console.log(index);
            this.$emit("getPlayerId", this.playAllList[index].id)
            console.log("下一首歌曲的id",this.playAllList[index].id);
            this.iconPlay = false
        },

        // 上一首歌
        prevFun(){
            let index = this.playAllList.findIndex(item=>item.id==this.playerId)//下标
            index = index-1<0?this.playAllList.length-1:index-1;
            this.$emit("getPlayerId", this.playAllList[index].id)
            console.log("上一首歌曲的id",this.playAllList[index].id);
        },

        // 音乐结束后的播放顺序
        onendedFun(){
            if(this.playerType==1){//顺序播放
                this.nextFun();
            }else if(this.playerType==2){//随机播放
                // 歌单列表里随机一首歌
                let index = parseInt(Math.random()*this.playAllList.length);
                this.$emit("getPlayerId",this.playAllList[index].id)
            }
        },


        // 控制进度条
        sliderInputFun(value){
            // console.log(value);
            let currentTime = value/100*this.timeRight
            this.timeLeft = currentTime
            this.$refs.audio.currentTime = currentTime
        },
        sliderDragStartFun(){
            this.$refs.audio.pause()
            this.iconPlay = true
            // if(this.iconPlay){
            //     this.iconPlay=!this.iconPlay
            // }
        },
        sliderDragEndFun(){
            this.$refs.audio.play()
            // this.iconPlay = !this.iconPlay
            this.iconPlay = false

        },


        // 处理分秒
        setTime(data){
            let m=parseInt(data/60)
            let s=parseInt(data%60)
            if(m==0&&s==0){
                return '0:00'
            }else {
                return m+":"+ (s<10?"0"+s:s);
            }
        }
    },
    // 侦听器
    watch:{
        "playerId":function(){
            console.log(this.playerId,"获取id");
            this.currentPlay=0
            this.iconPlay=true
            this.getSongDetailFun();//歌曲详情
            this.getSongUrlFun();//歌曲链接
            this.getLyricFun();//歌词数据
        },
        "playAllID":function(){
            // console.log(this.playAllID);
            getPlaylistDetail({id:this.playAllID}).then(data=>{
                this.playAllList = data.playlist.tracks
                // console.log(this.playAllList);
            })
        }
    },
    // 过滤器
    filters:{
        "Time":function(data){
            let m = parseInt(data/60)//分
            let s = parseInt(data&60)//秒
            if(m==0&&s==0){
                return '0:00'
            }else {
                return m+":"+(s>10?s:'0'+s)
            }
        }
    }
}
</script>

<style lang="scss">
audio {
    height: 36px;
    display: none;
}
.playerCon {
    position:fixed;
    left: 0;
    bottom: 0;
    background: transparent;
    width: 100%;
    height: 36px;
    padding: 0 12px;
    z-index: 10;
    .mini-play {
        position: relative;
        left: -3px;
        width: 100%;
        height: 36px;
        background: white;
        display: flex;
        .rotate {
            position: relative;
            top: -4px;
            width: 34px;
            height: 34px;
            background: #020202;
            border-radius: 50%;
            margin-right: 8px;
            // animation: Rotate 8s linear infinite;
            &.play{
                animation: Rotate 8s linear infinite;
            }
            &.pause{
                animation-play-state: paused;
            }
            .rotate-img {
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left: -11px;
                margin-top: -11px;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                overflow: hidden;
            }
        }

        @keyframes Rotate {
            0%{
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        .author {
            width: 64%;
            display: flex;
            .author-music {
                line-height: 36px;
                max-width: 140px;
            }
            .author-name {
                max-width: 80px;
                line-height: 36px;
                font-size: 12px;
                color:#747474;
            }
        }
        .mini-play-right {
            display: flex;
            align-items: center;
            .stop_play {
                position: relative;
                width: 21px;
                height: 21px;
                // border: 1px solid #020202;
                // border-radius: 50%;
                margin-right: 26px;
                .iconfont {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-40%,-45%);
                    font-size: 12px;
                }
            }
            .iconfont {
                font-size: 24px;
            }
        }
    }
}

.position-player {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 700;
    width: 100%;
    height: 100vh;
    .bigPlayer {
        width: 100%;
        padding-top: 10px;
        .bigPlayer-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 50px;
            line-height: 50px;
            padding: 0 8px;
            color: #fff;
            // background: pink;
            .bigPlayer-topLeft {
                height: 50px;
                margin-right: 46px;
                span {
                    font-size: 24px;
                }
            }
            .bigPlayer-topCenter {
                display: flex;
                flex-direction: column;
                align-items: center;
                // font-size: 14px;
                div {
                    max-width: 150px;
                    text-align: center;
                    line-height: 16px;
                }
                & div:first-child {
                    margin-bottom: 2px;
                }
                .bigPlayer-name {
                    position: relative;
                    padding: 0 23px;
                    color: #fff;
                    opacity: 0.8;
                    span {
                        position: absolute;
                        top: -2px;
                        right: -4px;
                        padding: 2px;
                        background: #000;
                        border-radius: 5px;
                        opacity: 0.3;
                        font-size: 12px;
                        transform: scale(0.6);
                        display: inline-block;
                    }
                }
            }
            .bigPlayer-topRight {
                display: flex;
                align-items: center;
                height: 50px;
                .bigPlayer-smallpict {
                    position: relative;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border: 1px solid #888;
                    img {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%,-50%);
                        width: 26px;
                        height: 26px;
                        border-radius: 50%;
                        
                    }
                }
                span {
                    margin-left: 10px;
                    font-size: 24px;
                }
            }
        }
        .bigPlayer-round {
            position: relative;
            width: 100%;
            height: 495px;
            padding: 20px;
            overflow: hidden;
            .player-round {
                overflow: hidden;
                position: absolute;
                left: 50%;
                top: 50%;
                // transform: translate(-50%,-50%);
                margin-top: -136px;
                margin-left: -136px;
                width: 272px;
                height: 272px;
                border-radius: 50%;
                background-color: #000;
                .player-round-line {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 110%;
                    height: 50px;
                    background: #fff;
                    opacity: 0.5;
                    filter: blur(20px);
                }
                .player-round-pict {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 185px;
                    height: 185px;
                    background: #565254;
                    border-radius: 50%;
                    img {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        margin-left: -44%;
                        margin-top: -44%;
                        width: 165px;
                        height: 165px;
                        display: block;
                        border-radius: 50%;
                        &.play{
                            animation: Rotate 8s linear infinite;
                        }
                        &.pause{
                            animation-play-state: paused;
                        }
                    }
                }
            }
            ul {
                position: absolute;
                left: 50%;
                top: 200px;
                width: 100%;
                margin-left: -50%;
                color: #ccc;
                transition: all 0.3s linear;
                li {
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    &.con {
                        color: #fff;
                        font-weight: bold;
                    }
                }
            }
        }
        .bigPlayer-func {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 0 10px;
            color: #fff;
            opacity: 0.8;
            .love-down-sing {
                width: 100%;
                height: 22px;
                &>div {
                    display: flex;
                    justify-content: center;
                    span {
                        display: inline-block;
                        width: 40px;
                        height: 22px;
                        // margin-right: 35px;
                        font-size: 22px;
                        line-height: 22px;
                        text-align: center;
                    }
                }
            }
            .bigPlayer-slider {
                width: 100%;
                height: 26px;
                display: flex;
                align-items: center;
                span {
                    font-size: 12px;
                }
                & span:first-child {
                    margin-right: 10px;
                }
                & span:last-child {
                    margin-left: 10px;
                }
            }
            .up-play-down {
                width: 100%;
                height: 36px;
                &>div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    span {
                        display: inline-block;
                        width: 57px;
                        height: 22px;
                        // margin-right: 35px;
                        font-size: 22px;
                        line-height: 22px;
                        text-align: center;
                    }
                    .big-icon {
                        width: 36px;
                        height: 36px;
                        margin: 0 17.5px;
                        line-height: 36px;
                        text-align: center;
                        font-size: 18px;
                        border: 1px solid #fff;
                        border-radius: 50%;
                        &>span {
                            display: inline-block;
                            width: 36px;
                            height: 36px;
                        }
                    }
                }
            }
        }
    }
    
    .bigPlayer-bg {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -10;
        width: 100%;
        height: 100vh;
        background: url('../../assets/images/109951164812388197.jpg') no-repeat center bottom;
        opacity: 1;
        transform: scale(4);
        transform-origin: center center;
        // background-size: 3000px;
        filter: blur(10px);
    }
}
</style>