import request from "./http";


// 获取轮播图数据
// http://192.168.36.2:3000/banner

// 获取轮播图数据
export function getBanner(){
    return request({
        url:"/banner",
        method:"get",
        params:{
            type:2 //手机版本
        }
    })
}
// 轮播图下方圆形图标数据
export function getHomepageball(){
    return request({
        url:"/homepage/dragon/ball",
        method:"get",
        params:{
            type:2 //手机版本
        }
    })
}

// 获取推荐歌单以及于推荐歌单相关的首页数据
export function getHomepageBlock(){
    return request({
        url:"/homepage/block/page",
        method:"get",
        params:{
            type:2 //手机版本
        }
    })
}




