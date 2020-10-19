/**
 * 过滤特殊字符
 */
export function stripscript(str){
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{ }【】‘；：”“'。，、？%+_]");
    var rs = "";
    for(var i=0; i<str.length; i++){
        rs = rs + str.substr(i,1).replace(pattern, '')
    }
    return rs;
}

/**
 * 验证邮箱
 */
export function validateEmali(val){
    let reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
    return !reg.test(val) ? true : false;
    // if(!reg.test(val)){
    //     return true
    // }else{
    //     return false
    // }
}

/**
 * 验证密码
 */
export function validatePass(val){
    let reg = /^(?!\D+$)(?![^A-Za-z]+$)\S{6,20}$/;
    return !reg.test(val) ? true : false;
}

/**
 * 没有使用 default 时，可以声明多个 export
 * 文件 import 引用需要 {}
 */