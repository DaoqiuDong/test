<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="原密码" prop="oldPassword">
      <el-input v-model="user.oldPassword" placeholder="请输入原密码" type="password" />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="user.newPassword" placeholder="请输入新密码" type="password" />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="user.confirmPassword" placeholder="请确认密码" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
     <!-- <el-button type="danger" size="mini" @click="close">关闭</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserPwd ,checkOldPassword } from "@/api/system/user";
import md5 from "js-md5";

export default {
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.newPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    const checkPassword =(rule,value,callback)=>{
      if(value){
        checkOldPassword(`${md5(value)}`).then(response=>{
        if(Number(response.data)>0){
          callback();
        }else{
          callback(new Error("原密码不正确，请重输！"));
        }
      })
      }
    };
    return {
      test: "1test",
      user: {
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined
      },
      // 表单校验
      rules: {
        oldPassword: [
          { required: true, message: "原密码不能为空", trigger: "blur" },
          { required: true, validator: checkPassword, trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" },
          { validator: this.passwordStonge, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateUserPwd(`${md5(this.user.oldPassword)}`, `${md5(this.user.newPassword)}`).then(
            response => {
              if (response.code === '200') {
                this.msgSuccess("修改成功");
              } else {
                this.msgError(response.msg);
              }
            }
          );
        }
      });
    },
    passwordStonge(rule, value, callback) {
      let s = value.match(/^.*\d+.*$/) ? 1 : 0
      s += value.match(/^.*[a-z]+.*$/) ? 1 : 0
      s += value.match(/^.*[A-Z]+.*$/) ? 1 : 0
      if (2 > s) {
        callback(new Error("密码必须包含字母和数字"))
      } else {
        callback()
      }
    },
    close() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.push({ path: "/index" });
    }
  }
};
</script>
