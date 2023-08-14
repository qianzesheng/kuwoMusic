import request from "./http";

// 搜索
// 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
// 必选参数 : keywords : 关键词
// 可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
// 接口地址 : /search 或者 /cloudsearch(更全)
// 调用例子 : /search?keywords=海阔天空 /cloudsearch?keywords=海阔天空
export function getSearchKeywords(params){
    return request({
        url:"/cloudsearch",
        // url:"/datajson/playList.json",
        method:"get",
        params
    })
}

// 热搜列表(简略)
// 说明 : 调用此接口,可获取热门搜索列表

// 接口地址 : /search/hot

// 调用例子 : /search/hot

export function getSearchHot(){
    return request({
        url:"/search/hot",
        // url:"/datajson/playList.json",
        method:"get",
    })
}


// 热搜列表(详细)
// 说明 : 调用此接口,可获取热门搜索列表
// 接口地址 : /search/hot/detail
// 调用例子 : /search/hot/detail
export function getSearchHotabc(){
    return request({
        url:"/search/hot/detail",
        // url:"/datajson/playList.json",
        method:"get",
    })
}

// 搜索多重匹配
// 说明 : 调用此接口 , 传入搜索关键词可获得搜索结果
// 必选参数 : keywords : 关键词
// 接口地址 : /search/multimatch
// 调用例子 : /search/multimatch?keywords=海阔天空
export function getSearchMultimatch(params){
    return request({
        url:"/search/multimatch",
        // url:"/datajson/playList.json",
        method:"get",
        params
    })
}