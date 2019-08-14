<template>
  <div>
    <el-row class="myrow">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="../../assets/images/logo.png" alt />
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple-light">
          <h2>电商后台管理系统</h2>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <a href="#" @click.prevent="logout" class="logout">退出</a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // window.localStorage.removeItem('islogin')
      // //在进行路由切换时，要注意router-view是否已经建好
      // this.$router.push('/login')
      this.$confirm("你确定要退出吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        window.localStorage.removeItem("token");
        //在进行路由切换时，要注意router-view是否已经建好
        this.$router.push("/login");
        this.$message({
          type: "success",
          message: "退出成功"
        });
      });
    }
  }
};
</script>

<style>
.myrow h2 {
  color: white;
}
.myrow .logout {
  color: red;
  font-size: 16px;
}
</style>
