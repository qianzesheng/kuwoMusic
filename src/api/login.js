import request from "./http";


// 登录接口
// /login/cellphone?phone=xxx&password=yyy
export function getLoginCellphone(data){
    return request({
        url:"/login/cellphone",
        method:"post",
        data
    })
}

// 发送验证码
// /captcha/sent?phone=13xxxx
export function getLoginCaptcha(data){
    return request({
        url:"/captcha/sent",
        method:"post",
        data
    })
}

// 验证验证码
// /captcha/verify?phone=13xxx&captcha=1597
export function getCcaptchaVerify(data){
    return request({
        url:"/captcha/verify",
        method:"post",
        data
    })
}

// 二维码调用用接口
// /login/qr/key
export function getLoginQrKey(){
    return request({
        url:"/login/qr/key",
        method:"post",
        data:{
            time:new Date().getTime() //防止缓存
        }
    })
}

// 二维码生成接口

// /login/qr/create?key=xxx
export function getLoginQrCreate(data){
    return request({
        url:"/login/qr/create",
        method:"post",
        data
    })
}
// 二维码检测扫码状态接口
// /login/qr/check?key=xxx
export function getLoginQrCheck(data){
    return request({
        url:"/login/qr/check",
        method:"post",
        data
    })
}

// 退出登录
// /logout

export function getLogout(data){
    return request({
        url:"/logout",
        method:"post",
        data
    })
}