import request from "./http";


// 获取歌曲详情
// /song/detail?ids=863046037

export function getSongDetail(params){
    return request({
        url:"/song/detail",
        // url:"/datajson/songDetail.json",
        method:"get",
        params
    })
}


// 歌曲url
// /song/url?id=863046037

export function getSongUrl(params){
    return request({
        url:"/song/url",
        // url:"/datajson/songUrl.json",
        method:"get",
        params
    })
}


// 获取歌词
// /lyric?id=863046037
export function getLyric(params){
    return request({
        url:"/lyric",
        // url:"/datajson/lyric.json",
        method:"get",
        params
    })
}
