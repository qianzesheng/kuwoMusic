import request from "./http";


// 获取账号信息
// 接口地址 : /user/account

export function getUserAccount(){
    return request({
        url:"/user/account",
        method:"post",
    })
}

// 获取用户详情
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
// 必选参数 : uid : 用户 id
// 接口地址 : /user/detail
// 调用例子 : /user/detail?uid=32953014
export function getUserDetail(params){
    return request({
        url:"/user/detail",
        method:"post",
        params
    })
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
// 说明 : 登录后调用此接口 , 可以获取用户信息
// 接口地址 : /user/subcount
// 调用例子 : /user/subcount
export function getUserSubcount(){
    return request({
        url:"/user/subcount",
        method:"get",
    })
}

// 获取用户歌单
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
// 必选参数 : uid : 用户 id
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// 接口地址 : /user/playlist
// 调用例子 : /user/playlist?uid=32953014
export function getUserPlaylist(params){
    return request({
        url:"/user/playlist",
        method:"get",
        params
    })
}