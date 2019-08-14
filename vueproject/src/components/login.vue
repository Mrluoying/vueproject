<template>
  <div class="bigbox">
    <div class="loginBox">
      
      <el-form label-position="top" :rules="rules" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h2>用户登录</h2>
        <el-form-item label="用户名" prop="username">
          <!-- 这个prop绑定的是传入Form组件的model中的字段 -->
          <el-input type="password" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" @keyup.enter.native="login('ruleForm')" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="mylogin" @click="login('ruleForm')" type="primary">登录</el-button>
          
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm:{
        username:'',
        password:''
      },
      rules:{
        //这个里面的字段要跟上面prop绑定的字段名一样
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {min:3,max:16,message:'长度在3到16个字符之间',trigger:'blur'},
        ],
        password:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {min:3,max:16,message:'长度在3到16个字符之间',trigger:'blur'},
        ],
      }
    }
  },
  methods:{
    login(ruleForm){

      console.log(this.$refs);
      
      this.$refs[ruleForm].validate(valid=>{
        if(valid){
          this.$http({
            url:'login',
            method:'POST',
            data:this.ruleForm
          }).then(res=>{
            console.log(res);
            const {meta,data}=res.data
            if (meta.status === 200) {
              let token = data.token
              window.localStorage.setItem('token',token)
              this.$router.push('/home')
            }else{
              this.$message.error(meta.msg)
            }
          }).catch(err=>{
            this.$message.error(err)
          })
        }else{
          return
        }
      })
    }
  }
};
</script>

<style>
.bigbox{
  position: relative;
  height: 100%;
  background-color: #324152;
  top: 0;
  left: 0;
  bottom: 0;
  
}
.loginBox{
  width: 580px;
  height: 440px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 5px;
  padding: 0 40px;
  box-sizing: border-box;
}


.mylogin{
  width: 100%
}
</style>
