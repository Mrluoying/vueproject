<template>
  <div class="sideBar">
    <el-menu :unique-opened="true"  default-active  :router=true class="el-menu-vertical-demo mymenu">
      <el-submenu v-for="(item,index) in menuList" :key="index" :index="item.path">
        <template  slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item v-for="(item1,index1) in item.children" :key="index1" :index="'/'+item1.path">
          <i class="el-icon-s-grid"></i>
          <span>{{item1.authName}}</span>
        </el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/roles">
          <i class="el-icon-s-grid"></i>
          <span>角色列表</span>
        </el-menu-item>
        <el-menu-item index="2-2">
          <i class="el-icon-s-grid"></i>
          <span>权限列表</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="3-1">
          <i class="el-icon-s-grid"></i>
          <span>商品列表</span>
        </el-menu-item>
        <el-menu-item index="3-2">
          <i class="el-icon-s-grid"></i>
          <span>分类参数</span>
        </el-menu-item>
        <el-menu-item index="3-3">
          <i class="el-icon-s-grid"></i>
          <span>商品分类</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index="4-1">
          <i class="el-icon-s-grid"></i>
          <span>订单列表</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item index="5-1">
          <i class="el-icon-s-grid"></i>
          <span>数据报表</span>
        </el-menu-item>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList:[]
    }
  },
  methods:{
    getMenuList(){
      this.$http({
        url:'menus'
      }).then(res=>{
        console.log(res);
        const {meta,data} = res.data
        if(meta.status === 200){
          this.menuList = data
        }
      })
    }
  },
  mounted(){
    this.getMenuList()
  }
};
</script>

<style>
.mymenu{
  height: 100%;
}
.sideBar{
  height: 100%
}
</style>
