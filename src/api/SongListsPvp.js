import request from "./http";

// 所有榜单
// 说明 : 调用此接口,可获取所有榜单 接口地址 : /toplist
// 调用例子 : /toplist
export function getSongListsPvpToplist(){
    return request({
        url:"/toplist/detail",
        method:"get",
    })
}



// 所有榜单内容摘要
// 说明 : 调用此接口,可获取所有榜单内容摘要
// 接口地址 : /toplist/detail
// 调用例子 : /toplist/detail