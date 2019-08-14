<template>
  <div class="mybox">
    <el-container>
      <el-header>
        <Top/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <sideBar/>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main> 
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Top from "@/components/layout/top";
import sideBar from "@/components/layout/sideBar"
export default {
  components: {
    Top,
    sideBar
  },
  mounted(){
    
    
    // var token = window.localStorage.getItem('islogin')
    // if(!token){
    //   this.$router.push('/login')
    //   this.$message.error('请先进行登录操作')
    // }
  }
};
</script>

<style>
.mybox {
  width: 100%;
  height: 100%;
}
.mymenu{
  height: 100%;
}
.el-container{
  height: 100%
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center;
  height: 100%;
  line-height: 160px; */
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  /* text-align: center; */
  height: 100%;
  line-height: 200px;
}

body > .el-container {
  margin-bottom: 40px;
}

.bigbox {
  width: 100%;
  height: 100%;
  padding: 20px;
}
.el-card {
  width: 100%;
}
</style>
