import request from "./http";


// 歌单列表
// /playlist/detail?id=24381616
export function getPlaylistDetail(params){
    return request({
        url:"/playlist/detail",
        // url:"/datajson/playList.json",
        method:"get",
        params
    })
}

// 获取歌单所有歌曲
// 说明 : 由于网易云接口限制，歌单详情只会提供 10 首歌，通过调用此接口，传入对应的歌单id，即可获得对应的所有歌曲
// 必选参数 : id : 歌单 id
// 可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
// 可选参数 : offset : 默认值为0
// 接口地址 : /playlist/track/all
// 调用例子 : /playlist/track/all?id=24381616&limit=10&offset=1
// export function getPlaylistTrackAll(params){
//     return request({
//         url:"/playlist/track/all",
//         // url:"/datajson/playList.json",
//         method:"get",
//         params
//     })
// }