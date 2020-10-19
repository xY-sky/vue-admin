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
          <label for="uesrname">邮箱</label>
          <el-input
            id="uesrname"
            type="text"
            v-model="ruleForm.uesrname"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="text"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" v-if="model === 'registered'">
          <label for="passwords">重复密码</label>
          <el-input
            id="passwords"
            type="text"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label for="code">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15"
              ><el-input
                id="code"
                v-model="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input
            ></el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="getSms()"
                >获取验证码</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            class="block mar"
            @click="submitForm('ruleForm')"
            >{{ model === 'login' ? '登录' : '注册' }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { GetSms } from "@/api/login";
import { stripscript, validateEmali, validatePass } from "@/utils/validate"; //js文件不使用 default
export default {
  name: "login",
  data() {
    //验证用户名
    var validateUesrname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (validateEmali(value)) {
        callback(new Error("邮箱格式有误"));
      } else {
        callback();
      }
    };
    //验证密码
    var validatePassword = (rule, value, callback) => {
      console.log(stripscript(value));
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码长度为6到20位数字+字母"));
      } else {
        callback();
      }
    };
    //验证重复密码
    var validatePasswords = (rule, value, callback) => {
      //如果模块使用v-show，判断model
      //if(this,model === 'login'){ callback(); }
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    //验证验证码
    var validateCode = (rule, value, callback) => {
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;
      let reg = /^[a-z0-9]{6}/;
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      } else if (!reg.test(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "registered" }
      ],
      //模块值
      model: "login",
      //表单数据
      ruleForm: {
        uesrname: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules: {
        uesrname: [{ validator: validateUesrname, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  created() {},
  //挂载完成自动执行
  mounted() {},
  methods: {
    toggleMneu(data) {
      this.menuTab.forEach((elem, index) => {
        elem.current = false;
      });
      //高光
      data.current = true;
      //修改模块值
      this.model = data.type;
    },
    //获取验证码
    getSms() {
      if(!this.ruleForm.uesrname){
        this.$message.error('邮箱不能为空！');
        return false;
      }else if(validateEmali(this.ruleForm.uesrname)){
        this.$message.error('邮箱格式有误');
        return false;
      }
      // GetSms(this.ruleForm.uesrname)
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    //提交表单
    submitForm(formName) {
      // axios.request({
      //   method: 'post',
      //   url: '/user/12345',
      //   data: {
      //     firstName: 'Fred',
      //     lastName: 'Flintstone'
      //   }
      // })
      // .then(function(response) {
      //   console.log(response);
      // })
      // .catch(function(error) {
      //   console.log(error);
      // });

      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
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