<template>
    <div>
        <!-- 搜索页面 -->
        <div class="Search">
            <!-- 搜索页面顶部搜索框 -->
            <div class="top">
                <router-link tag="div" to="/home" class="top-left">
                    <i class="iconfont icon-arrow-left-bold"></i>
                </router-link >
                <div class="top-center">
                    <i class="iconfont icon-search"></i>
                    <input autofocus @keydown.enter="EnterSearchMusic" @input="searchMusic" type="text" v-model="searchValue" placeholder="请输入你想搜索的歌曲">
                </div>
                <div @click="searchBtn" class="top-right">搜索</div>
            </div>
            <ul>
                <li v-for="item in searchList" :key="item.id">
                    <div class="search-li-left">
                        <span class="iconfont icon-search"></span>
                    </div>
                    <div @click="inpLiText" class="search-li-right">
                        <span class="one-txt-cut search-li-right-author">{{item.ar[0].name}}{{item.ar[1]?','+item.ar[1].name:''}} {{item.name}}</span>
                        <!-- <span class="one-txt-cut search-li-right-name">--{{item.name}}</span> -->
                    </div>
                </li>
            </ul>
            <!-- 搜索页面顶部分类 -->
            <div class="top-nav">
                <div class="nav-list">
                    <i class="iconfont icon-laoshi"></i>
                    <span>歌手</span>
                </div>
                <div class="nav-list">
                    <i class="iconfont icon-huodong"></i>
                    <span>曲风</span>
                </div>
                <div class="nav-list">
                    <i class="iconfont icon-yintiao"></i>
                    <span>专区</span>
                </div>
                <div class="nav-list">
                    <i class="iconfont icon-gechang"></i>
                    <span>识曲</span>
                </div>
            </div>
            <!-- 搜索页面猜你喜欢 -->
            <div class="Search-like">
                <div class="guess">
                    <span>猜你喜欢</span>
                    <i @click="splitSearchHotList" class="iconfont icon-xunhuan7"></i>
                </div>
            </div>
            <div class="Search-like-content">
                <div v-for="(item,index) in searchHotList_slice " :key="index" class="S-L-lists">{{item.searchWord}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {getSearchKeywords,getSearchHotabc} from "../api/search"
import debounce from "../api/allFun"
export default {
    props:["searchText"],
    data() {
        return {
            searchValue:'',//输入框内的值
            searchList:[],//搜索关键字后的歌曲列表
            searchHotList:[],//搜索页面的热搜列表
            searchHotList_slice:[],//搜索页面的热搜列表截取版
            // searchLiText:'',//搜索关键字未跳转的列表的内容
        }
    },
    methods:{
        searchMusic:debounce(function(){
            if(this.searchValue==''){
                this.searchList=[]
            }else {
                getSearchKeywords({keywords:this.searchValue}).then(data=>{
                    // console.log(data);
                    this.searchList = data.result.songs
                    // console.log(this);
                    // console.log(this.searchList);
                })
            }
        },700),
        // 输入框按回去进入搜索
        EnterSearchMusic(event){
            // console.log(event.target.value);
            // console.log(this);
            this.$emit("EnterSearchMusic",event.target.value)
            this.$router.push('/searchAll')
        },

        // 输入框右侧的搜索按钮
        searchBtn(){
            this.$emit("searchBtn",this.searchValue)
            this.$router.push('/searchAll')
        },
        // 关键字搜索出来的未回车的歌曲列表的点击事件
        inpLiText(e){
            // console.log(this.$refs);
            // this.searchLiText = e.target.innerText
            this.$emit("EnterSearchMusic",e.target.innerText)
            this.$router.push('/searchAll')
            // console.log(this.searchLiText);
        },

        // 获取搜索页面的热搜列表
        getSearchHotFun(){
            getSearchHotabc().then(data=>{
                // console.log(data);
                this.searchHotList = data.data
                this.searchHotList_slice = this.searchHotList.splice(0,4)
                // console.log(this.searchHotList);
            })
        },

        splitSearchHotList(){
            let searchHotList_slice = this.searchHotList.sort(function(){
                return Math.random()-0.5
            })
            // console.log(searchHotList_slice);
            this.searchHotList_slice = searchHotList_slice.slice(0,4)
            // console.log(this.searchHotList_slice);
        }
    },
    created(){
        this.getSearchHotFun()
    }
}
</script>

<style lang="scss">
.Search {
    position: relative;
    width: 100%;
    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        // height: 42px;
        background: #fff;
        line-height: 50px;
        padding: 0 15px;
        .top-center {
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
    ul{
        position: absolute;
        top: 50px;
        left: 0;
        width: 100%;
        background: #fff;
        z-index: 10;
        li{
            display: flex;
            align-items: center;
            width: 100%;
            height: 40px;
            padding: 0 10px;
            background: #fff;
            font-size: 16px;
            border-bottom: 1px solid #f7f7f7;
            .search-li-left {
                margin-right: 10px;
                .iconfont {
                    font-size: 14px;
                }
            }
            .search-li-right {
                display: flex;
                align-items: center;
                height: 30px;
                .search-li-right-author {
                    line-height: 30px;
                    display: inline-block;
                    max-width: 290px;
                }
                .search-li-right-name {
                    line-height: 30px;
                    display: inline-block;
                    max-width: 230px;
                    .highLight {
                        color: #111;
                    }
                }
            }
        }
    }
    .top-nav {
        width: 100%;
        height: 20px;
        background: #fff;
        display: flex;
        padding: 0 16px;
        line-height: 20px;
        margin-bottom: 6px;
        .nav-list {
            width: 25%;
            height: 20px;
            padding: 0 4px;
            background: #fff;
            text-align: center;
            font-size: 12px;
            border-right: 1px solid #f3f3f3;
            &:last-child {
                border-right:transparent ;
            }
            i {
                display: inline-block;
                color: #ff2c2c;
                margin-right: 6px;
            }
            span {
                display: inline-block;
            }
        }
    }
    .Search-like {
        width: 100%;    
        padding: 0 10px;
        padding-top: 6px;
        background: #f7f7f7;
        .guess {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 24px;
            background: #f7f7f7;
            line-height: 24px;
            font-weight: 700;
            i {
                font-size: 22px;
                font-weight: normal;
            }
        }
    }
    .Search-like-content {
        width: 100%;
        height: calc(100vh - 106px);
        padding: 0 10px;
        padding-top: 4px;
        background: #f7f7f7;
        .S-L-lists {
            display: inline-block;
            height: 20px;
            line-height: 20px;
            padding: 0 7px;
            font-size: 12px;
            background: #fff;
            border-radius: 20px;
            margin-right: 4px;
        }
    }

}
</style>