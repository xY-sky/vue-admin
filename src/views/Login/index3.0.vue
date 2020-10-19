<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <!-- <li class="current">登录</li>
                <li>注册</li> -->
        <li
          :class="{ current: item.current }"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMneu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="uesrname" style="margin-top:29px;">
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.uesrname"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label>密码</label>
          <el-input
            type="text"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" v-if="model === 'registered'">
          <label>重复密码</label>
          <el-input
            type="text"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15"
              ><el-input
                v-model="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input
            ></el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            class="block mar"
            @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from '@vue/composition-api'
import { stripscript, validateEmali, validatePass } from '@/utils/validate'
export default {
  name: "login",
  // setup(props,context){
    setup(props,{ refs }){
    //验证用户名
    let validateUesrname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if(validateEmali(value)){
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    //验证密码
    let validatePassword = (rule, value, callback) => {
      console.log(stripscript(value));
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码长度为6到20位数字+字母"));
      } else {
        callback();
      }
    };
    //验证重复密码
    let validatePasswords = (rule, value, callback) => {
      //如果模块使用v-show，判断model
      //if(model.value === 'login'){ callback(); }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    //验证验证码
    let validateCode = (rule, value, callback) => {
      ruleForm.code = stripscript(value);
      value = ruleForm.code;
      let reg = /^[a-z0-9]{6}/;
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      }else if(!reg.test(value)){
         callback(new Error("验证码格式有误"));
      }else{
        callback();
      }
    };
    /**
     * 声明数据
     */
    //reactive声明是对象，ref声明基本类型(获取或改值，xx.value)
    const menuTab = reactive([
      { txt: "登录", current: true, type:'login' },
      { txt: "注册", current: false,  type:'registered'}
    ]);
    // console.log(menuTab)

    //模块值
    const model = ref('login');
    // console.log(model.value)

     //表单数据
    const ruleForm = reactive({
      uesrname: "",
      password: "",
      passwords: "",
      code: ""
    });
    const rules = reactive({
      uesrname: [{ validator: validateUesrname, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });

    /**
     * 声明函数
     */
    const toggleMneu = (data => {
      menuTab.forEach((elem, index) => {
        elem.current = false;
      });
      //高光
      data.current = true;
      //修改模块值
      model.value = data.type
    }) 
    const submitForm = (formName => {
      // context.refs[formName].validate(valid => {
      refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    })

    /**
     * 生命周期
     */
    onMounted(() => {

    })

    return {
      menuTab, model, ruleForm, rules, toggleMneu, submitForm
    }
  },
  created() {},
  //挂载完成自动执行
  mounted() {}
};
</script>

<style scoped lang="scss">
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  padding-top: 150px;
  margin: 0 auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .block {
    display: block;
    width: 100%;
  }
  .mar {
    margin-top: 16px;
  }
}
</style>