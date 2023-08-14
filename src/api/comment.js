import request from "./http";
// 歌单评论
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该歌单的所有评论 ( 不需要
// 登录 )
// 必选参数 : id: 歌单 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 😦 评论页数 -1)*20, 其中 20 为 limit 的值
// 接口地址 : /comment/playlist
// 调用例子 : /comment/playlist?id=705123491
export function getSongDetail(params){
    return request({
        url:"/comment/playlist",
        // url:"/datajson/songDetail.json",
        method:"get",
        params
    })
}