import service from "@/utils/request";//js文件使用export default，不需要{}
/**
 * 获取验证码
 */
export function GetSms(data){
    return service.request({
        method: "post",
        url: "/getSms",
        data: {
            username: data
        }
    })
    // return service.request({
    //     method: "get",
    //     url: "/captchaImage"
    // })
}

/**
 * 获取用户角色
 */

/**
 * 登录
 */

/**
 * 注册
 */